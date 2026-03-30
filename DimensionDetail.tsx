import { useState } from 'react';
import { useTranslation } from '../../i18n';
import type { DimensionCode, DimensionScore } from '../../types';

interface DimensionDetailProps {
  code: DimensionCode;
  score: DimensionScore;
  color: string;
}

export default function DimensionDetail({ code, score, color }: DimensionDetailProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const value = score.adjusted ?? score.raw;
  const levelNum = Math.round(Math.max(1, Math.min(5, value)));

  return (
    <div className="border border-theme transition-theme">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[var(--bg-secondary)] transition-default"
      >
        {/* Color indicator */}
        <div
          className="w-3 h-8 flex-shrink-0"
          style={{ backgroundColor: color, borderRadius: '1px' }}
        />

        {/* Dimension name */}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-medium text-fg">
            {t(`dim.${code}.name`)}
          </div>
          <div className="text-xs text-fg3 mt-0.5">
            {t(`dim.${code}.question`)}
          </div>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-right">
          <div className="font-serif text-xl text-fg">{value.toFixed(1)}</div>
          <div className="text-[10px] tracking-wider uppercase text-fg3">
            {t(`level.${levelNum}.name`)}
          </div>
        </div>

        {/* Expand arrow */}
        <div className={`text-fg3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="h-px bg-[var(--border)] mb-4" />

          {/* Level description */}
          <p className="text-sm text-fg2 leading-relaxed mb-4">
            {t(`level.${levelNum}.description`)}
          </p>

          {/* Individual question answers */}
          <div className="space-y-2">
            <div className="text-[10px] tracking-wider uppercase text-fg3 mb-2">
              {t('ui.yourAnswers')}
            </div>
            {[1, 2, 3, 4, 5].map((qNum) => {
              const qId = `${code}-${qNum}`;
              const answer = score.answers[qId];
              if (answer === undefined) return null;

              return (
                <div key={qId} className="flex items-start gap-3 text-sm">
                  <span className="font-serif italic text-fg3 flex-shrink-0 w-6 text-right">
                    {qNum}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-fg2 text-[13px]">
                      {t(`q.${qId}.title`)}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                      borderRadius: '1px',
                    }}
                  >
                    {answer}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score bar */}
          <div className="mt-4 h-2 bg-[var(--bg-secondary)]">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(value / 5) * 100}%`,
                backgroundColor: color,
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
