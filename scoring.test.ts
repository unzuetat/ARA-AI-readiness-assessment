import { describe, it, expect } from 'vitest';
import {
  calculateDimensionScore,
  calculateAllDimensionScores,
  calculateOverallScore,
  extractRawScores,
  isAssessmentComplete,
  getProgress,
  DEFAULT_WEIGHTS,
} from '../scoring';
import type { MaturityLevelNumber } from '../../types';

describe('Scoring Engine', () => {
  // Helper: generate answers for a dimension at a uniform level
  const uniformAnswers = (dimension: string, level: MaturityLevelNumber) => {
    const answers: Record<string, MaturityLevelNumber> = {};
    for (let i = 1; i <= 5; i++) {
      answers[`${dimension}-${i}`] = level;
    }
    return answers;
  };

  // Helper: generate all 30 answers at a uniform level
  const allUniformAnswers = (level: MaturityLevelNumber) => {
    const dims = ['STR', 'DAT', 'TAL', 'GOV', 'CUL', 'PRO'];
    let answers: Record<string, MaturityLevelNumber> = {};
    for (const dim of dims) {
      answers = { ...answers, ...uniformAnswers(dim, level) };
    }
    return answers;
  };

  describe('calculateDimensionScore', () => {
    it('returns correct score for uniform answers', () => {
      const answers = uniformAnswers('STR', 3);
      const result = calculateDimensionScore('STR', answers);
      expect(result.raw).toBe(3);
      expect(result.confidence).toBe('declared');
      expect(Object.keys(result.answers)).toHaveLength(5);
    });

    it('returns correct score for mixed answers', () => {
      const answers: Record<string, MaturityLevelNumber> = {
        'STR-1': 1,
        'STR-2': 2,
        'STR-3': 3,
        'STR-4': 4,
        'STR-5': 5,
      };
      const result = calculateDimensionScore('STR', answers);
      expect(result.raw).toBe(3);
    });

    it('handles partial answers', () => {
      const answers: Record<string, MaturityLevelNumber> = {
        'STR-1': 4,
        'STR-2': 2,
      };
      const result = calculateDimensionScore('STR', answers);
      expect(result.raw).toBe(3);
      expect(Object.keys(result.answers)).toHaveLength(2);
    });

    it('returns 0 for no answers', () => {
      const result = calculateDimensionScore('STR', {});
      expect(result.raw).toBe(0);
    });

    it('ignores answers from other dimensions', () => {
      const answers: Record<string, MaturityLevelNumber> = {
        'DAT-1': 5,
        'DAT-2': 5,
      };
      const result = calculateDimensionScore('STR', answers);
      expect(result.raw).toBe(0);
    });
  });

  describe('calculateAllDimensionScores', () => {
    it('calculates all 6 dimensions', () => {
      const answers = allUniformAnswers(3);
      const scores = calculateAllDimensionScores(answers);
      expect(Object.keys(scores)).toHaveLength(6);
      expect(scores.STR.raw).toBe(3);
      expect(scores.GOV.raw).toBe(3);
    });
  });

  describe('calculateOverallScore', () => {
    it('returns correct weighted average with equal weights', () => {
      const answers = allUniformAnswers(3);
      const scores = calculateAllDimensionScores(answers);
      const overall = calculateOverallScore(scores, DEFAULT_WEIGHTS);
      expect(overall).toBe(3);
    });

    it('weights dimensions correctly', () => {
      const answers: Record<string, MaturityLevelNumber> = {
        ...uniformAnswers('STR', 5),
        ...uniformAnswers('DAT', 1),
        ...uniformAnswers('TAL', 1),
        ...uniformAnswers('GOV', 1),
        ...uniformAnswers('CUL', 1),
        ...uniformAnswers('PRO', 1),
      };
      const scores = calculateAllDimensionScores(answers);

      // With equal weights, average = (5+1+1+1+1+1)/6 = 1.67
      const equalOverall = calculateOverallScore(scores, DEFAULT_WEIGHTS);
      expect(equalOverall).toBeCloseTo(1.67, 1);

      // With STR weight 5x, STR dominates
      const heavyWeights = { STR: 5, DAT: 1, TAL: 1, GOV: 1, CUL: 1, PRO: 1 } as const;
      const weightedOverall = calculateOverallScore(scores, heavyWeights);
      expect(weightedOverall).toBeGreaterThan(equalOverall);
    });
  });

  describe('extractRawScores', () => {
    it('returns numeric scores', () => {
      const answers = allUniformAnswers(4);
      const scores = calculateAllDimensionScores(answers);
      const raw = extractRawScores(scores);
      expect(raw.STR).toBe(4);
      expect(raw.PRO).toBe(4);
    });
  });

  describe('isAssessmentComplete', () => {
    it('returns true when all 30 questions answered', () => {
      const answers = allUniformAnswers(3);
      expect(isAssessmentComplete(answers)).toBe(true);
    });

    it('returns false when incomplete', () => {
      const answers = uniformAnswers('STR', 3);
      expect(isAssessmentComplete(answers)).toBe(false);
    });
  });

  describe('getProgress', () => {
    it('tracks progress per dimension', () => {
      const answers: Record<string, MaturityLevelNumber> = {
        'STR-1': 3,
        'STR-2': 3,
        'DAT-1': 2,
      };
      const progress = getProgress(answers);
      expect(progress.STR.answered).toBe(2);
      expect(progress.STR.total).toBe(5);
      expect(progress.DAT.answered).toBe(1);
      expect(progress.GOV.answered).toBe(0);
    });
  });
});
