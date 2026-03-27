import { create } from 'zustand';
import type {
  AssessmentPhase,
  AssessmentResult,
  AssessmentState,
  DimensionCode,
  MaturityLevelNumber,
} from '../types';
import { DIMENSION_ORDER } from '../data/dimensions';
import { DEFAULT_WEIGHTS, calculateAllDimensionScores, calculateOverallScore } from '../engine/scoring';
import { classify } from '../engine/archetype-classifier';
import { detectContradictions } from '../engine/contradiction-detector';
import { generateRecommendations } from '../engine/diagnosis';

interface StoreActions {
  // Navigation
  setPhase: (phase: AssessmentPhase) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToDimension: (index: number) => void;

  // Assessment
  setAnswer: (questionId: string, level: MaturityLevelNumber) => void;
  setOrganizationName: (name: string) => void;
  setSelectedIndustry: (industry: string) => void;
  setWeights: (weights: Record<DimensionCode, number>) => void;

  // Results
  calculateResults: () => void;

  // Reset
  resetAssessment: () => void;

  // Saved results
  saveResult: (result: AssessmentResult) => void;
}

const initialState: AssessmentState = {
  phase: 'welcome',
  currentDimension: 0,
  currentQuestion: 0,
  answers: {},
  deepDiveAnswers: {},
  organizationName: '',
  selectedIndustry: '',
  weights: { ...DEFAULT_WEIGHTS },
  result: null,
  savedResults: [],
};

export const useStore = create<AssessmentState & StoreActions>((set, get) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  nextQuestion: () => {
    const { currentDimension, currentQuestion } = get();
    if (currentQuestion < 4) {
      set({ currentQuestion: currentQuestion + 1 });
    } else if (currentDimension < 5) {
      set({ currentDimension: currentDimension + 1, currentQuestion: 0 });
    }
    // If at last question of last dimension, don't advance (UI handles transition to results)
  },

  prevQuestion: () => {
    const { currentDimension, currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    } else if (currentDimension > 0) {
      set({ currentDimension: currentDimension - 1, currentQuestion: 4 });
    }
  },

  goToDimension: (index) =>
    set({ currentDimension: index, currentQuestion: 0 }),

  setAnswer: (questionId, level) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: level },
    })),

  setOrganizationName: (name) => set({ organizationName: name }),

  setSelectedIndustry: (industry) => set({ selectedIndustry: industry }),

  setWeights: (weights) => set({ weights }),

  calculateResults: () => {
    const { answers, weights, organizationName, selectedIndustry } = get();

    // Calculate scores
    const dimensionScores = calculateAllDimensionScores(answers);
    const overallScore = calculateOverallScore(dimensionScores, weights);

    // Classify archetype
    const archetype = classify(dimensionScores);

    // Detect contradictions
    const contradictions = detectContradictions(dimensionScores);

    // Generate recommendations
    const recommendations = generateRecommendations(dimensionScores, contradictions);

    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      organizationName: organizationName || undefined,
      industry: selectedIndustry || undefined,
      dimensionScores,
      overallScore,
      archetype,
      contradictions,
      recommendations,
      deepDiveCompleted: [],
      weights,
    };

    set({ result, phase: 'results' });
  },

  resetAssessment: () =>
    set({
      phase: 'welcome',
      currentDimension: 0,
      currentQuestion: 0,
      answers: {},
      deepDiveAnswers: {},
      organizationName: '',
      selectedIndustry: '',
      weights: { ...DEFAULT_WEIGHTS },
      result: null,
    }),

  saveResult: (result) =>
    set((state) => ({
      savedResults: [...state.savedResults, result],
    })),
}));
