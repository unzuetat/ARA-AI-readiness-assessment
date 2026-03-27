// ============================================================
// ARA — Core Type Definitions
// ============================================================

// --- Enums & Literals ---

export type DimensionCode = 'STR' | 'DAT' | 'TAL' | 'GOV' | 'CUL' | 'PRO';

export type MaturityLevelNumber = 1 | 2 | 3 | 4 | 5;

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export type Effort = 'Low' | 'Medium' | 'High';

export type Impact = 'Low' | 'Medium' | 'High';

export type ConfidenceLevel = 'declared' | 'evidence-supported';

export type ComparisonType = 'temporal' | 'departmental';

export type DeepDiveInputType = 'numeric' | 'date' | 'select' | 'text';

// --- Dimensions ---

export interface Dimension {
  code: DimensionCode;
  name: string;
  shortName: string;
  description: string;
  coreQuestion: string;
  icon: string; // lucide-react icon name
  accentColor: string; // tailwind class suffix, e.g. 'str'
}

// --- Maturity Levels ---

export interface MaturityLevel {
  level: MaturityLevelNumber;
  name: string;
  oneLiner: string;
  description: string;
}

// --- Questions (Layer 1) ---

export interface QuestionOption {
  level: MaturityLevelNumber;
  text: string;
}

export interface AssessmentQuestion {
  id: string; // e.g., 'STR-1'
  dimension: DimensionCode;
  title: string;
  prompt: string;
  options: QuestionOption[];
  order: number;
}

// --- Deep Dive Questions (Layer 2) ---

export interface ScoringRule {
  condition: string; // human-readable condition
  check: (value: string | number) => boolean;
  adjustment: number; // -1.0 to +0.5
  insight: string;
}

export interface DeepDiveQuestion {
  id: string; // e.g., 'DD-STR-1'
  dimension: DimensionCode;
  applicableLevels: [number, number]; // inclusive range
  prompt: string;
  inputType: DeepDiveInputType;
  options?: string[];
  scoringRules: ScoringRule[];
}

// --- Archetypes ---

export interface Archetype {
  id: string;
  name: string;
  pattern: string; // human-readable pattern
  narrative: string;
  keyRisk: string;
  exitPath: string;
  scoreCondition: (scores: Record<DimensionCode, number>) => boolean;
  priority: number; // lower = checked first
}

// --- Contradictions ---

export interface ContradictionRule {
  id: string;
  name: string;
  condition: (scores: Record<DimensionCode, number>) => boolean;
  severity: Severity;
  narrative: string;
  implication: string;
  resolution: string;
  involvedDimensions: DimensionCode[];
}

export interface DetectedContradiction {
  ruleId: string;
  name: string;
  severity: Severity;
  narrative: string;
  implication: string;
  resolution: string;
  involvedDimensions: DimensionCode[];
}

// --- Recommendations ---

export interface Recommendation {
  id: string;
  dimension: DimensionCode;
  applicableLevel: MaturityLevelNumber;
  quickWin: string;
  structuralMove: string;
  effort: Effort;
  impact: Impact;
}

export interface PrioritizedRecommendation extends Recommendation {
  priority: number;
  reason: string; // why this was prioritized
}

// --- Benchmarks ---

export interface IndustryBenchmark {
  id: string;
  industry: string;
  scores: Record<DimensionCode, number>;
}

// --- Results ---

export interface DimensionScore {
  raw: number;
  adjusted?: number;
  confidence: ConfidenceLevel;
  answers: Record<string, MaturityLevelNumber>; // questionId → level
}

export interface AssessmentResult {
  id: string;
  timestamp: number;
  organizationName?: string;
  industry?: string;
  dimensionScores: Record<DimensionCode, DimensionScore>;
  overallScore: number;
  archetype: Archetype;
  contradictions: DetectedContradiction[];
  recommendations: PrioritizedRecommendation[];
  deepDiveCompleted: DimensionCode[];
  weights: Record<DimensionCode, number>;
}

// --- Assessment State ---

export type AssessmentPhase =
  | 'welcome'
  | 'assessment'
  | 'results'
  | 'deep-dive'
  | 'comparison';

export interface AssessmentState {
  phase: AssessmentPhase;
  currentDimension: number; // 0-5 index
  currentQuestion: number; // 0-4 index within dimension
  answers: Record<string, MaturityLevelNumber>;
  deepDiveAnswers: Record<string, string | number>;
  organizationName: string;
  selectedIndustry: string;
  weights: Record<DimensionCode, number>;
  result: AssessmentResult | null;
  savedResults: AssessmentResult[];
}
