import { useTranslation } from '../../i18n';
import type { MaturityLevelNumber } from '../../types';

interface QuestionCardProps {
  questionId: string;
  selectedLevel: MaturityLevelNumber | undefined;
  onSelect: (level: MaturityLevelNumber) => void;
}

const LEVEL_INDICATORS: Record<number, string> = {
  1: 'bg-red-500/60',
  2: 'bg-amber-500/60',
  3: 'bg-blue-500/60',
  4: 'bg-indigo-500/60',
  5: 'bg-emerald-500/60',
};

const LEVEL_BORDERS_SELECTED: Record<number, string> = {
  1: 'border-red-500/40 bg-red-500/5',
  2: 'border-amber-500/40 bg-amber-500/5',
  3: 'border-blue-500/40 bg-blue-500/5',
  4: 'border-indigo-500/40 bg-indigo-500/5',
  5: 'border-emerald-500/40 bg-emerald-500/5',
};

export default function QuestionCard({
  questionId,
  selectedLevel,
  onSelect,
}: QuestionCardProps) {
  const { t } = useTranslation();

  const levels: MaturityLevelNumber[] = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Question title & prompt */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-content-primary">
          {t(`q.${questionId}.title`)}
        </h2>
        <p className="text-sm text-content-secondary leading-relaxed">
          {t(`q.${questionId}.prompt`)}
        </p>
      </div>

      {/* Scenario options */}
      <div className="space-y-2.5">
        {levels.map((level) => {
          const isSelected = selectedLevel === level;

          return (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className={`w-full text-left px-4 py-3.5 rounded border transition-default group ${
                isSelected
                  ? `${LEVEL_BORDERS_SELECTED[level]} border`
                  : 'border-surface-400 bg-surface-700/50 hover:bg-surface-600/50 hover:border-surface-300'
              }`}
            >
              <div className="flex gap-3">
                {/* Level indicator */}
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className={`w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold transition-default ${
                      isSelected
                        ? `${LEVEL_INDICATORS[level]} text-white`
                        : 'bg-surface-500 text-content-muted group-hover:bg-surface-400'
                    }`}
                  >
                    {level}
                  </div>
                </div>

                {/* Scenario text */}
                <div
                  className={`text-sm leading-relaxed transition-default ${
                    isSelected
                      ? 'text-content-primary'
                      : 'text-content-secondary group-hover:text-content-primary'
                  }`}
                >
                  {t(`q.${questionId}.opt.${level}`)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Level name hint */}
      {selectedLevel && (
        <div className="text-xs text-content-muted text-center animate-fade-in">
          {t(`level.${selectedLevel}.name`)} — {t(`level.${selectedLevel}.oneLiner`)}
        </div>
      )}
    </div>
  );
}
