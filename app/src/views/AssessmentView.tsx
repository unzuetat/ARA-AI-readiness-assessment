import { useCallback, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { useStore } from '../store';
import { DIMENSION_ORDER } from '../data/dimensions';
import { isAssessmentComplete } from '../engine/scoring';
import ProgressBar from '../components/assessment/ProgressBar';
import DimensionHeader from '../components/assessment/DimensionHeader';
import QuestionCard from '../components/assessment/QuestionCard';
import type { MaturityLevelNumber } from '../types';

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

  const handleSelect = useCallback(
    (level: MaturityLevelNumber) => {
      setAnswer(questionId, level);
      if (!isLastQuestion) {
        setTimeout(() => {
          nextQuestion();
        }, 350);
      }
    },
    [questionId, isLastQuestion, setAnswer, nextQuestion]
  );

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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ProgressBar
        currentDimension={currentDimension}
        currentQuestion={currentQuestion}
        answers={answers}
        onDimensionClick={goToDimension}
      />

      <DimensionHeader code={dimensionCode} />

      <div key={questionId}>
        <QuestionCard
          questionId={questionId}
          selectedLevel={selectedLevel}
          onSelect={handleSelect}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-theme">
        <button
          onClick={() => {
            if (isFirstQuestion) {
              setPhase('welcome');
            } else {
              prevQuestion();
            }
          }}
          className="text-sm text-fg2 hover:text-fg transition-default"
        >
          {isFirstQuestion ? t('ui.back') : t('ui.previous')}
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-fg3">
            <span className="px-1.5 py-0.5 border border-theme text-fg3">1-5</span>
            <span>{t('ui.toSelect')}</span>
            <span className="px-1.5 py-0.5 border border-theme text-fg3">← →</span>
            <span>{t('ui.toNavigate')}</span>
          </div>

          {isLastQuestion && isComplete ? (
            <button
              onClick={calculateResults}
              className="px-6 py-2 bg-accent text-on-accent text-sm font-medium transition-default"
            >
              {t('ui.viewResults')}
            </button>
          ) : isLastQuestion && !isComplete ? (
            <span className="text-xs text-fg3">{t('ui.answerAll')}</span>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!selectedLevel}
              className={`px-5 py-2 text-sm font-medium transition-default ${
                selectedLevel
                  ? 'border border-strong text-fg hover:bg-surface'
                  : 'border border-theme text-muted cursor-not-allowed'
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
