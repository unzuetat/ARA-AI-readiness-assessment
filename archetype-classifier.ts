import type { Archetype, DimensionCode, DimensionScore } from '../types';
import { classifyArchetype } from '../data/archetypes';
import { extractRawScores } from './scoring';

// ============================================================
// Archetype Classifier Engine
// ============================================================

/**
 * Classify an organization's archetype from dimension scores.
 */
export function classify(
  dimensionScores: Record<DimensionCode, DimensionScore>
): Archetype {
  const rawScores = extractRawScores(dimensionScores);
  return classifyArchetype(rawScores);
}

/**
 * Get the confidence level of archetype classification.
 * Based on how cleanly the scores match the archetype pattern.
 */
export function getClassificationConfidence(
  dimensionScores: Record<DimensionCode, DimensionScore>
): 'strong' | 'moderate' | 'weak' {
  const rawScores = extractRawScores(dimensionScores);
  const vals = Object.values(rawScores);

  // High variance = strong pattern = confident classification
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance =
    vals.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / vals.length;

  // Extreme scores = confident
  const hasExtremes = vals.some((v) => v <= 1.5 || v >= 4.5);

  if (variance >= 1.0 || hasExtremes) return 'strong';
  if (variance >= 0.4) return 'moderate';
  return 'weak';
}

/**
 * Generate a one-paragraph executive summary of the archetype diagnosis.
 */
export function generateArchetypeSummary(
  archetype: Archetype,
  overallScore: number
): string {
  const levelName =
    overallScore < 1.5
      ? 'Initial'
      : overallScore < 2.5
        ? 'Developing'
        : overallScore < 3.5
          ? 'Defined'
          : overallScore < 4.5
            ? 'Managed'
            : 'Optimizing';

  return `Your organization's AI readiness profile is "${archetype.name}" with an overall maturity score of ${overallScore.toFixed(1)} (${levelName}). ${archetype.narrative}`;
}
