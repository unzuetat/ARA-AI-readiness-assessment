import type {
  DimensionCode,
  DimensionScore,
  PrioritizedRecommendation,
  DetectedContradiction,
} from '../types';
import { DIMENSION_ORDER } from '../data/dimensions';
import { RECOMMENDATIONS } from '../data/recommendations';

// ============================================================
// Diagnosis Engine
// ============================================================

export interface GapAnalysis {
  dimension: DimensionCode;
  score: number;
  overallAverage: number;
  gap: number; // negative = below average
  isCritical: boolean; // Level 1
  isStrength: boolean; // above average
}

/**
 * Analyze gaps and strengths across dimensions.
 */
export function analyzeGaps(
  dimensionScores: Record<DimensionCode, DimensionScore>
): GapAnalysis[] {
  const scores = DIMENSION_ORDER.map((dim) => ({
    dimension: dim,
    score: dimensionScores[dim].adjusted ?? dimensionScores[dim].raw,
  }));

  const overallAverage =
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

  return scores.map(({ dimension, score }) => ({
    dimension,
    score,
    overallAverage: Math.round(overallAverage * 100) / 100,
    gap: Math.round((score - overallAverage) * 100) / 100,
    isCritical: score <= 1.5,
    isStrength: score > overallAverage,
  }));
}

/**
 * Get dimensions sorted by gap severity (worst first).
 */
export function getGapsByPriority(gaps: GapAnalysis[]): GapAnalysis[] {
  return [...gaps]
    .filter((g) => !g.isStrength)
    .sort((a, b) => {
      // Critical gaps first
      if (a.isCritical && !b.isCritical) return -1;
      if (!a.isCritical && b.isCritical) return 1;
      // Then by gap size (most negative first)
      return a.gap - b.gap;
    });
}

/**
 * Get strengths sorted by score (highest first).
 */
export function getStrengths(gaps: GapAnalysis[]): GapAnalysis[] {
  return [...gaps]
    .filter((g) => g.isStrength)
    .sort((a, b) => b.score - a.score);
}

/**
 * Generate prioritized recommendations based on scores, gaps, and contradictions.
 */
export function generateRecommendations(
  dimensionScores: Record<DimensionCode, DimensionScore>,
  contradictions: DetectedContradiction[]
): PrioritizedRecommendation[] {
  const gaps = analyzeGaps(dimensionScores);
  const prioritizedGaps = getGapsByPriority(gaps);
  const results: PrioritizedRecommendation[] = [];

  let priorityCounter = 1;

  // 1. Critical gaps first (any dimension at Level 1)
  const criticalDimensions = gaps
    .filter((g) => g.isCritical)
    .map((g) => g.dimension);

  for (const dim of criticalDimensions) {
    const score = dimensionScores[dim].adjusted ?? dimensionScores[dim].raw;
    const level = Math.round(Math.max(1, Math.min(4, score)));
    const recs = RECOMMENDATIONS.filter(
      (r) => r.dimension === dim && r.applicableLevel === level
    );
    for (const rec of recs) {
      results.push({
        ...rec,
        priority: priorityCounter++,
        reason: `Critical gap: ${dim} is at Level ${score.toFixed(1)} — immediate attention needed.`,
      });
    }
  }

  // 2. Contradiction-involved dimensions
  const contradictionDimensions = new Set<DimensionCode>();
  for (const c of contradictions) {
    for (const dim of c.involvedDimensions) {
      if (!criticalDimensions.includes(dim)) {
        contradictionDimensions.add(dim);
      }
    }
  }

  for (const dim of contradictionDimensions) {
    const score = dimensionScores[dim].adjusted ?? dimensionScores[dim].raw;
    const level = Math.round(Math.max(1, Math.min(4, score)));
    const recs = RECOMMENDATIONS.filter(
      (r) => r.dimension === dim && r.applicableLevel === level
    );
    for (const rec of recs) {
      if (!results.find((r) => r.id === rec.id)) {
        results.push({
          ...rec,
          priority: priorityCounter++,
          reason: `Addresses structural contradiction involving ${dim}.`,
        });
      }
    }
  }

  // 3. Biggest gaps (dimensions furthest below average, not already covered)
  const coveredDimensions = new Set(results.map((r) => r.dimension));

  for (const gap of prioritizedGaps) {
    if (coveredDimensions.has(gap.dimension)) continue;

    const score = dimensionScores[gap.dimension].adjusted ?? dimensionScores[gap.dimension].raw;
    const level = Math.round(Math.max(1, Math.min(4, score)));
    const recs = RECOMMENDATIONS.filter(
      (r) => r.dimension === gap.dimension && r.applicableLevel === level
    );
    for (const rec of recs) {
      results.push({
        ...rec,
        priority: priorityCounter++,
        reason: `Gap: ${gap.dimension} is ${Math.abs(gap.gap).toFixed(1)} points below average.`,
      });
    }
    coveredDimensions.add(gap.dimension);
  }

  // 4. Remaining dimensions (strengths — still get recommendations for growth)
  for (const dim of DIMENSION_ORDER) {
    if (coveredDimensions.has(dim)) continue;

    const score = dimensionScores[dim].adjusted ?? dimensionScores[dim].raw;
    const level = Math.round(Math.max(1, Math.min(4, score)));
    const recs = RECOMMENDATIONS.filter(
      (r) => r.dimension === dim && r.applicableLevel === level
    );
    for (const rec of recs) {
      results.push({
        ...rec,
        priority: priorityCounter++,
        reason: `Growth opportunity: ${dim} is a strength — push it further.`,
      });
    }
  }

  return results;
}

/**
 * Identify quick wins across all recommendations.
 * Quick wins = Low effort + High impact.
 */
export function getQuickWins(
  recommendations: PrioritizedRecommendation[]
): PrioritizedRecommendation[] {
  return recommendations.filter(
    (r) => r.effort === 'Low' && r.impact === 'High'
  );
}
