import { useTranslation } from '../../i18n';
import { DIMENSION_ORDER } from '../../data/dimensions';
import type { DimensionCode, MaturityLevelNumber } from '../../types';

interface ProgressBarProps {
  currentDimension: number;
  currentQuestion: number;
  answers: Record<string, MaturityLevelNumber>;
  onDimensionClick: (index: number) => void;
}

const DIMENSION_COLORS: Record<DimensionCode, string> = {
  STR: 'bg-dimension-str',
  DAT: 'bg-dimension-dat',
  TAL: 'bg-dimension-tal',
  GOV: 'bg-dimension-gov',
  CUL: 'bg-dimension-cul',
  PRO: 'bg-dimension-pro',
};

const DIMENSION_COLORS_MUTED: Record<DimensionCode, string> = {
  STR: 'bg-dimension-str/20',
  DAT: 'bg-dimension-dat/20',
  TAL: 'bg-dimension-tal/20',
  GOV: 'bg-dimension-gov/20',
  CUL: 'bg-dimension-cul/20',
  PRO: 'bg-dimension-pro/20',
};

export default function ProgressBar({
  currentDimension,
  currentQuestion,
  answers,
  onDimensionClick,
}: ProgressBarProps) {
  const { t } = useTranslation();

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = 30;
  const percentComplete = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between text-xs text-content-tertiary">
        <span>
          {t('ui.questionOf', {
            current: totalAnswered,
            total: totalQuestions,
          })}
        </span>
        <span>{percentComplete}%</span>
      </div>

      {/* Dimension segments */}
      <div className="flex gap-1.5">
        {DIMENSION_ORDER.map((code, dimIndex) => {
          const isActive = dimIndex === currentDimension;
          const answeredInDim = [1, 2, 3, 4, 5].filter(
            (q) => answers[`${code}-${q}`] !== undefined
          ).length;
          const isComplete = answeredInDim === 5;

          return (
            <button
              key={code}
              onClick={() => onDimensionClick(dimIndex)}
              className={`group relative flex-1 transition-default ${
                isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
              title={t(`dim.${code}.short`)}
            >
              {/* Background track */}
              <div
                className={`h-2 rounded-sm ${
                  isActive ? DIMENSION_COLORS_MUTED[code] : 'bg-surface-400/50'
                }`}
              >
                {/* Fill */}
                <div
                  className={`h-full rounded-sm transition-all duration-300 ${
                    DIMENSION_COLORS[code]
                  } ${isComplete ? 'opacity-100' : isActive ? 'opacity-80' : 'opacity-60'}`}
                  style={{ width: `${(answeredInDim / 5) * 100}%` }}
                />
              </div>

              {/* Dimension label */}
              <div
                className={`mt-1.5 text-[10px] font-medium transition-default ${
                  isActive
                    ? 'text-content-secondary'
                    : 'text-content-muted group-hover:text-content-tertiary'
                }`}
              >
                {t(`dim.${code}.short`)}
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-0 right-0 flex justify-center">
                  <div
                    className={`w-1 h-1 rounded-full ${DIMENSION_COLORS[code]}`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current position */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-content-secondary font-medium">
          {t(`dim.${DIMENSION_ORDER[currentDimension]}.name`)}
        </span>
        <span className="text-content-muted">
          {currentQuestion + 1} / 5
        </span>
      </div>
    </div>
  );
}
