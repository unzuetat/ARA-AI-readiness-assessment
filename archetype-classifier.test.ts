import { describe, it, expect } from 'vitest';
import { classifyArchetype } from '../../data/archetypes';
import type { DimensionCode } from '../../types';

describe('Archetype Classifier', () => {
  const makeScores = (
    str: number, dat: number, tal: number,
    gov: number, cul: number, pro: number
  ): Record<DimensionCode, number> => ({
    STR: str, DAT: dat, TAL: tal, GOV: gov, CUL: cul, PRO: pro,
  });

  it('classifies The Unaware (all low)', () => {
    const result = classifyArchetype(makeScores(1, 1, 1, 1, 1, 1));
    expect(result.id).toBe('the-unaware');
  });

  it('classifies The AI-Native (all high)', () => {
    const result = classifyArchetype(makeScores(5, 4.5, 4.5, 5, 4.5, 4.5));
    expect(result.id).toBe('the-ai-native');
  });

  it('classifies The Paper Tiger (strategy + governance without execution)', () => {
    const result = classifyArchetype(makeScores(4, 1.5, 1.5, 4, 3, 1.5));
    expect(result.id).toBe('the-paper-tiger');
  });

  it('classifies The Cautious Observer (governance without culture or strategy)', () => {
    const result = classifyArchetype(makeScores(1.5, 2, 2, 3.5, 1.5, 2));
    expect(result.id).toBe('the-cautious-observer');
  });

  it('classifies The Technical Island (data + talent without strategy/culture/governance)', () => {
    const result = classifyArchetype(makeScores(1.5, 4, 3.5, 1.5, 1.5, 2));
    expect(result.id).toBe('the-technical-island');
  });

  it('classifies The Capability-First (data + talent + process without governance/strategy)', () => {
    const result = classifyArchetype(makeScores(1.5, 3.5, 3.5, 1.5, 3, 3.5));
    expect(result.id).toBe('the-capability-first');
  });

  it('classifies The Governance-First (governance strong, technical weak)', () => {
    const result = classifyArchetype(makeScores(3.5, 1.5, 1.5, 4.5, 3, 1.5));
    expect(result.id).toBe('the-governance-first');
  });

  it('classifies The Siloed Achiever (high variance)', () => {
    const result = classifyArchetype(makeScores(1, 5, 1, 1, 1, 1));
    expect(result.id).toBe('the-siloed-achiever');
  });

  it('classifies The Enthusiastic Consumer (low scores, above unaware)', () => {
    const result = classifyArchetype(makeScores(1.8, 1.8, 2, 1.5, 2, 2));
    expect(result.id).toBe('the-enthusiastic-consumer');
  });

  it('classifies The Pocketful of Pilots (strategy/talent developing, data/process weak)', () => {
    const result = classifyArchetype(makeScores(2.5, 1.5, 2.5, 2.5, 2.5, 1.5));
    expect(result.id).toBe('the-pocketful-of-pilots');
  });

  it('classifies The Strategic Executor (most high, 2+ at level 4)', () => {
    const result = classifyArchetype(makeScores(4, 4, 3.5, 3.5, 3, 3.5));
    expect(result.id).toBe('the-strategic-executor');
  });

  it('classifies The Balanced Beginner (all 2-3, low variance)', () => {
    const result = classifyArchetype(makeScores(2.4, 2.6, 2.4, 2.6, 2.4, 2.6));
    expect(result.id).toBe('the-balanced-beginner');
  });

  // Edge cases
  it('does not classify high-overall orgs as Unaware', () => {
    const result = classifyArchetype(makeScores(3, 3, 3, 3, 3, 3));
    expect(result.id).not.toBe('the-unaware');
  });

  it('never returns undefined', () => {
    // Random scores should always classify
    for (let i = 0; i < 20; i++) {
      const scores = makeScores(
        1 + Math.random() * 4,
        1 + Math.random() * 4,
        1 + Math.random() * 4,
        1 + Math.random() * 4,
        1 + Math.random() * 4,
        1 + Math.random() * 4,
      );
      const result = classifyArchetype(scores);
      expect(result).toBeDefined();
      expect(result.name).toBeTruthy();
    }
  });
});
