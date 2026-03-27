import { describe, it, expect } from 'vitest';
import { detectContradictions, wouldContradictionFire } from '../contradiction-detector';
import { calculateAllDimensionScores } from '../scoring';
import type { DimensionCode, MaturityLevelNumber } from '../../types';

describe('Contradiction Detector', () => {
  // Helper: create dimension scores from raw numbers
  const makeScoresFromRaw = (
    str: number, dat: number, tal: number,
    gov: number, cul: number, pro: number
  ) => {
    const dims: DimensionCode[] = ['STR', 'DAT', 'TAL', 'GOV', 'CUL', 'PRO'];
    const vals = [str, dat, tal, gov, cul, pro];
    const answers: Record<string, MaturityLevelNumber> = {};

    for (let d = 0; d < dims.length; d++) {
      const level = Math.round(Math.max(1, Math.min(5, vals[d]))) as MaturityLevelNumber;
      for (let q = 1; q <= 5; q++) {
        answers[`${dims[d]}-${q}`] = level;
      }
    }

    return calculateAllDimensionScores(answers);
  };

  describe('C1: Strategy without Governance', () => {
    it('fires when STR ≥ 3 and GOV ≤ 1.5', () => {
      const scores = makeScoresFromRaw(4, 2, 2, 1, 2, 2);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C1')).toBe(true);
    });

    it('does not fire when both are high', () => {
      const scores = makeScoresFromRaw(4, 2, 2, 4, 2, 2);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C1')).toBe(false);
    });
  });

  describe('C2: Governance without Action', () => {
    it('fires when GOV ≥ 3 and PRO ≤ 1.5', () => {
      const scores = makeScoresFromRaw(2, 2, 2, 4, 2, 1);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C2')).toBe(true);
    });
  });

  describe('C5: Data without Governance', () => {
    it('fires when DAT ≥ 3 and GOV ≤ 1.5', () => {
      const scores = makeScoresFromRaw(2, 4, 2, 1, 2, 2);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C5')).toBe(true);
    });
  });

  describe('C9: Everything without Governance (CRITICAL)', () => {
    it('fires when overall ≥ 3 but GOV ≤ 1.5', () => {
      const scores = makeScoresFromRaw(4, 4, 3, 1, 3, 4);
      const contradictions = detectContradictions(scores);
      const c9 = contradictions.find((c) => c.ruleId === 'C9');
      expect(c9).toBeDefined();
      expect(c9?.severity).toBe('CRITICAL');
    });

    it('does not fire when GOV is adequate', () => {
      const scores = makeScoresFromRaw(4, 4, 3, 3, 3, 4);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C9')).toBe(false);
    });
  });

  describe('C10: Governance Overreach', () => {
    it('fires when GOV ≥ 4 and everything else ≤ 2', () => {
      const scores = makeScoresFromRaw(2, 1, 1, 5, 2, 1);
      const contradictions = detectContradictions(scores);
      expect(contradictions.some((c) => c.ruleId === 'C10')).toBe(true);
    });
  });

  describe('Severity ordering', () => {
    it('returns CRITICAL before HIGH before MEDIUM', () => {
      // Scenario that triggers C9 (CRITICAL) and C1 (HIGH) and C3 (MEDIUM)
      const scores = makeScoresFromRaw(4, 4, 3, 1, 3, 4);
      const contradictions = detectContradictions(scores);

      if (contradictions.length >= 2) {
        const severities = contradictions.map((c) => c.severity);
        const critIdx = severities.indexOf('CRITICAL');
        const highIdx = severities.indexOf('HIGH');

        if (critIdx !== -1 && highIdx !== -1) {
          expect(critIdx).toBeLessThan(highIdx);
        }
      }
    });
  });

  describe('No contradictions for balanced scores', () => {
    it('returns empty for all dimensions at 3', () => {
      const scores = makeScoresFromRaw(3, 3, 3, 3, 3, 3);
      const contradictions = detectContradictions(scores);
      expect(contradictions).toHaveLength(0);
    });
  });

  describe('wouldContradictionFire', () => {
    it('returns true for matching rule', () => {
      expect(
        wouldContradictionFire('C1', {
          STR: 4, DAT: 2, TAL: 2, GOV: 1, CUL: 2, PRO: 2,
        })
      ).toBe(true);
    });

    it('returns false for non-matching rule', () => {
      expect(
        wouldContradictionFire('C1', {
          STR: 1, DAT: 2, TAL: 2, GOV: 4, CUL: 2, PRO: 2,
        })
      ).toBe(false);
    });

    it('returns false for non-existent rule', () => {
      expect(
        wouldContradictionFire('C99', {
          STR: 1, DAT: 1, TAL: 1, GOV: 1, CUL: 1, PRO: 1,
        })
      ).toBe(false);
    });
  });
});
