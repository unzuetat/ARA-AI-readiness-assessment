import type { DimensionCode, DimensionScore, DetectedContradiction } from '../types';
import { CONTRADICTION_RULES } from '../data/contradictions';
import { extractRawScores } from './scoring';

// ============================================================
// Contradiction Detector Engine
// ============================================================

/**
 * Detect all contradictions present in the given dimension scores.
 */
export function detectContradictions(
  dimensionScores: Record<DimensionCode, DimensionScore>
): DetectedContradiction[] {
  const rawScores = extractRawScores(dimensionScores);
  const detected: DetectedContradiction[] = [];

  for (const rule of CONTRADICTION_RULES) {
    if (rule.condition(rawScores)) {
      detected.push({
        ruleId: rule.id,
        name: rule.name,
        severity: rule.severity,
        narrative: rule.narrative,
        implication: rule.implication,
        resolution: rule.resolution,
        involvedDimensions: rule.involvedDimensions,
      });
    }
  }

  // Sort by severity: CRITICAL > HIGH > MEDIUM
  const severityOrder: Record<string, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
  };

  return detected.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );
}

/**
 * Check if a specific contradiction rule would fire for given scores.
 */
export function wouldContradictionFire(
  ruleId: string,
  scores: Record<DimensionCode, number>
): boolean {
  const rule = CONTRADICTION_RULES.find((r) => r.id === ruleId);
  if (!rule) return false;
  return rule.condition(scores);
}

/**
 * Get a summary of all contradictions for display.
 */
export function getContradictionSummary(
  contradictions: DetectedContradiction[]
): string {
  if (contradictions.length === 0) {
    return 'No structural contradictions detected. Your dimension scores are internally consistent.';
  }

  const critical = contradictions.filter((c) => c.severity === 'CRITICAL').length;
  const high = contradictions.filter((c) => c.severity === 'HIGH').length;
  const medium = contradictions.filter((c) => c.severity === 'MEDIUM').length;

  const parts: string[] = [];
  if (critical > 0) parts.push(`${critical} critical`);
  if (high > 0) parts.push(`${high} high-severity`);
  if (medium > 0) parts.push(`${medium} medium-severity`);

  return `Detected ${contradictions.length} structural contradiction${contradictions.length > 1 ? 's' : ''}: ${parts.join(', ')}. These indicate misalignments between your capabilities that should be addressed.`;
}
