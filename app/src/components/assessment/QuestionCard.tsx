import { useState, useMemo } from 'react';
import { useTranslation } from '../../i18n';
import type { MaturityLevelNumber } from '../../types';

interface QuestionCardProps {
  questionId: string;
  selectedLevel: MaturityLevelNumber | undefined;
  onSelect: (level: MaturityLevelNumber) => void;
}

const LEVEL_ACCENTS: Record<number, string> = {
  1: 'border-[#BE123C]/40 bg-[#BE123C]/5',
  2: 'border-[#B45309]/40 bg-[#B45309]/5',
  3: 'border-[#4338CA]/40 bg-[#4338CA]/5',
  4: 'border-[#1D4ED8]/40 bg-[#1D4ED8]/5',
  5: 'border-[#047857]/40 bg-[#047857]/5',
};

const LEVEL_DOTS: Record<number, string> = {
  1: '#BE123C',
  2: '#B45309',
  3: '#4338CA',
  4: '#1D4ED8',
  5: '#047857',
};

/**
 * Stable shuffle: same questionId always produces the same order.
 * This prevents re-shuffling when navigating back and forth.
 */
function stableShuffle(questionId: string, levels: MaturityLevelNumber[]): MaturityLevelNumber[] {
  let hash = 0;
  for (let i = 0; i < questionId.length; i++) {
    hash = ((hash << 5) - hash + questionId.charCodeAt(i)) | 0;
  }
  const arr = [...levels];
  for (let i = arr.length - 1; i > 0; i--) {
    hash = ((hash << 5) - hash + i) | 0;
    const j = Math.abs(hash) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuestionCard({
  questionId,
  selectedLevel,
  onSelect,
}: QuestionCardProps) {
  const { t } = useTranslation();
  const [simpleMode, setSimpleMode] = useState(false);

  const levels: MaturityLevelNumber[] = [1, 2, 3, 4, 5];
  const shuffledLevels = useMemo(() => stableShuffle(questionId, levels), [questionId]);

  const getOptionText = (level: MaturityLevelNumber): string => {
    if (simpleMode) {
      const altKey = `q.${questionId}.opt.${level}.alt`;
      const altText = t(altKey);
      // If no alt translation exists, t() returns the key itself
      if (altText !== altKey) return altText;
    }
    return t(`q.${questionId}.opt.${level}`);
  };

  const getPromptText = (): string => {
    if (simpleMode) {
      const altKey = `q.${questionId}.prompt.alt`;
      const altText = t(altKey);
      if (altText !== altKey) return altText;
    }
    return t(`q.${questionId}.prompt`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Question title & prompt */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-2xl font-normal text-fg leading-tight">
            {t(`q.${questionId}.title`)}
          </h2>
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 border transition-default ${
              simpleMode
                ? 'border-[var(--dim-str)] text-[var(--dim-str)]'
                : 'border-theme text-fg3 hover:text-fg2'
            }`}
            title={t('ui.simplifyTooltip')}
          >
            {simpleMode ? t('ui.technicalMode') : t('ui.simplifyMode')}
          </button>
        </div>
        <p className="text-base text-fg2 leading-relaxed">
          {getPromptText()}
        </p>
      </div>

      {/* Scenario options — shuffled */}
      <div className="space-y-3">
        {shuffledLevels.map((level) => {
          const isSelected = selectedLevel === level;

          return (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className={`w-full text-left px-5 py-4 border transition-default group ${
                isSelected
                  ? `${LEVEL_ACCENTS[level]}`
                  : 'border-theme bg-[var(--bg-secondary)] hover:border-strong'
              }`}
            >
              <div className="flex gap-4">
                {/* Level dot indicator */}
                <div className="flex-shrink-0 pt-1">
                  <div
                    className="w-3 h-3 transition-default"
                    style={{
                      backgroundColor: isSelected ? LEVEL_DOTS[level] : 'var(--border)',
                      borderRadius: '1px',
                    }}
                  />
                </div>

                {/* Scenario text */}
                <div
                  className={`text-[15px] leading-relaxed transition-default ${
                    isSelected
                      ? 'text-fg'
                      : 'text-fg2 group-hover:text-fg'
                  }`}
                >
                  {getOptionText(level)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Level feedback after selection */}
      {selectedLevel && (
        <div className="text-sm text-fg3 text-center animate-fade-in font-serif italic">
          {t(`level.${selectedLevel}.name`)} — {t(`level.${selectedLevel}.oneLiner`)}
        </div>
      )}
    </div>
  );
}
