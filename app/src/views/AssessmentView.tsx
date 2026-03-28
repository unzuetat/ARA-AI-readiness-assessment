import { useCallback, useEffect } from 'react';
import { useTranslation } from '../../i18n';
import { useStore } from '../../store';
import { DIMENSION_ORDER } from '../../data/dimensions';
import { isAssessmentComplete } from '../../engine/scoring';
import ProgressBar from '../../components/assessment/ProgressBar';
import DimensionHeader from '../../components/assessment/DimensionHeader';
import QuestionCard from '../../components/assessment/QuestionCard';
import type { MaturityLevelNumber } from '../../types';

export default function AssessmentView() {
  const { t } = useTranslation();
  const {
    currentDimension,
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToDimension,
    calculateResults,
    setPhase,
  } = useStore();

  const dimensionCode = DIMENSION_ORDER[currentDimension];
  const questionId = `${dimensionCode}-${currentQuestion + 1}`;
  const selectedLevel = answers[questionId];
  const isComplete = isAssessmentComplete(answers);
  const isLastQuestion = currentDimension === 5 && currentQuestion === 4;
  const isFirstQuestion = currentDimension === 0 && currentQuestion === 0;

  // Auto-advance after selection (with small delay for visual feedback)
  const handleSelect = useCallback(
    (level: MaturityLevelNumber) => {
      setAnswer(questionId, level);

      // Don't auto-advance on last question
      if (!isLastQuestion) {
        setTimeout(() => {
          nextQuestion();
        }, 350);
      }
    },
    [questionId, isLastQuestion, setAnswer, nextQuestion]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isLastQuestion) nextQuestion();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isFirstQuestion) prevQuestion();
      } else if (e.key >= '1' && e.key <= '5') {
        handleSelect(parseInt(e.key) as MaturityLevelNumber);
      } else if (e.key === 'Escape') {
        setPhase('welcome');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLastQuestion, isFirstQuestion, nextQuestion, prevQuestion, handleSelect, setPhase]);

  const handleViewResults = () => {
    calculateResults();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <ProgressBar
        currentDimension={currentDimension}
        currentQuestion={currentQuestion}
        answers={answers}
        onDimensionClick={goToDimension}
      />

      {/* Dimension context */}
      <DimensionHeader code={dimensionCode} />

      {/* Question */}
      <div key={questionId}>
        <QuestionCard
          questionId={questionId}
          selectedLevel={selectedLevel}
          onSelect={handleSelect}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-surface-400">
        <button
          onClick={() => {
            if (isFirstQuestion) {
              setPhase('welcome');
            } else {
              prevQuestion();
            }
          }}
          className="px-4 py-2 text-sm text-content-secondary hover:text-content-primary transition-default"
        >
          {isFirstQuestion ? t('ui.back') : t('ui.previous')}
        </button>

        <div className="flex items-center gap-3">
          {/* Keyboard hints */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-content-muted">
            <span className="px-1.5 py-0.5 bg-surface-600 rounded text-content-tertiary">
              1-5
            </span>
            <span>{t('ui.toSelect')}</span>
            <span className="px-1.5 py-0.5 bg-surface-600 rounded text-content-tertiary">
              ← →
            </span>
            <span>{t('ui.toNavigate')}</span>
          </div>

          {isLastQuestion && isComplete ? (
            <button
              onClick={handleViewResults}
              className="px-6 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-default"
            >
              {t('ui.viewResults')}
            </button>
          ) : isLastQuestion && !isComplete ? (
            <span className="text-xs text-content-muted">
              {t('ui.answerAll')}
            </span>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!selectedLevel}
              className={`px-5 py-2 text-sm font-medium rounded transition-default ${
                selectedLevel
                  ? 'bg-surface-600 hover:bg-surface-500 text-content-primary'
                  : 'bg-surface-700 text-content-muted cursor-not-allowed'
              }`}
            >
              {t('ui.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
