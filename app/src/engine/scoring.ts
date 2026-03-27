import type { DimensionCode, MaturityLevelNumber, DimensionScore } from '../types';
import { DIMENSION_ORDER } from '../data/dimensions';
import { QUESTIONS } from '../data/questions';

// ============================================================
// Scoring Engine
// ============================================================

/**
 * Default weights: equal across all dimensions.
 */
export const DEFAULT_WEIGHTS: Record<DimensionCode, number> = {
  STR: 1.0,
  DAT: 1.0,
  TAL: 1.0,
  GOV: 1.0,
  CUL: 1.0,
  PRO: 1.0,
};

/**
 * Preset weight configurations.
 */
export const WEIGHT_PRESETS: Record<string, Record<DimensionCode, number>> = {
  equal: { STR: 1.0, DAT: 1.0, TAL: 1.0, GOV: 1.0, CUL: 1.0, PRO: 1.0 },
  'governance-heavy': { STR: 1.2, DAT: 0.9, TAL: 0.9, GOV: 1.5, CUL: 0.9, PRO: 0.9 },
  'technical-heavy': { STR: 0.8, DAT: 1.5, TAL: 1.1, GOV: 0.8, CUL: 0.8, PRO: 1.2 },
};

/**
 * Calculate the score for a single dimension from its question answers.
 */
export function calculateDimensionScore(
  dimension: DimensionCode,
  answers: Record<string, MaturityLevelNumber>
): DimensionScore {
  const dimensionQuestions = QUESTIONS.filter((q) => q.dimension === dimension);
  const answeredQuestions: Record<string, MaturityLevelNumber> = {};
  let total = 0;
  let count = 0;

  for (const question of dimensionQuestions) {
    const answer = answers[question.id];
    if (answer !== undefined) {
      answeredQuestions[question.id] = answer;
      total += answer;
      count++;
    }
  }

  const raw = count > 0 ? total / count : 0;

  return {
    raw: Math.round(raw * 100) / 100, // 2 decimal places
    confidence: 'declared',
    answers: answeredQuestions,
  };
}

/**
 * Calculate all dimension scores from all answers.
 */
export function calculateAllDimensionScores(
  answers: Record<string, MaturityLevelNumber>
): Record<DimensionCode, DimensionScore> {
  const scores = {} as Record<DimensionCode, DimensionScore>;

  for (const dim of DIMENSION_ORDER) {
    scores[dim] = calculateDimensionScore(dim, answers);
  }

  return scores;
}

/**
 * Calculate the overall weighted score from dimension scores.
 */
export function calculateOverallScore(
  dimensionScores: Record<DimensionCode, DimensionScore>,
  weights: Record<DimensionCode, number> = DEFAULT_WEIGHTS
): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const dim of DIMENSION_ORDER) {
    const score = dimensionScores[dim].adjusted ?? dimensionScores[dim].raw;
    const weight = weights[dim];
    weightedSum += score * weight;
    totalWeight += weight;
  }

  const overall = totalWeight > 0 ? weightedSum / totalWeight : 0;
  return Math.round(overall * 100) / 100;
}

/**
 * Extract raw numeric scores for use in archetype/contradiction checks.
 */
export function extractRawScores(
  dimensionScores: Record<DimensionCode, DimensionScore>
): Record<DimensionCode, number> {
  const raw = {} as Record<DimensionCode, number>;

  for (const dim of DIMENSION_ORDER) {
    raw[dim] = dimensionScores[dim].adjusted ?? dimensionScores[dim].raw;
  }

  return raw;
}

/**
 * Check if the assessment is complete (all 30 questions answered).
 */
export function isAssessmentComplete(
  answers: Record<string, MaturityLevelNumber>
): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}

/**
 * Get the number of answered questions per dimension.
 */
export function getProgress(
  answers: Record<string, MaturityLevelNumber>
): Record<DimensionCode, { answered: number; total: number }> {
  const progress = {} as Record<DimensionCode, { answered: number; total: number }>;

  for (const dim of DIMENSION_ORDER) {
    const dimQuestions = QUESTIONS.filter((q) => q.dimension === dim);
    const answered = dimQuestions.filter((q) => answers[q.id] !== undefined).length;
    progress[dim] = { answered, total: dimQuestions.length };
  }

  return progress;
}
