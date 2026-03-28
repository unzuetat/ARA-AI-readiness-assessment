import { useTranslation } from '../i18n';
import { useStore } from '../../store';
import { DIMENSION_ORDER } from '../../data/dimensions';
import type { DimensionCode } from '../../types';

const BAR_COLORS: Record<DimensionCode, string> = {
  STR: 'bg-dimension-str',
  DAT: 'bg-dimension-dat',
  TAL: 'bg-dimension-tal',
  GOV: 'bg-dimension-gov',
  CUL: 'bg-dimension-cul',
  PRO: 'bg-dimension-pro',
};

export default function ResultsView() {
  const { t } = useTranslation();
  const { result, resetAssessment } = useStore();

  if (!result) {
    return (
      <div className="text-center py-16">
        <p className="text-content-secondary">{t('ui.noResults')}</p>
        <button
          onClick={resetAssessment}
          className="mt-4 px-6 py-2 bg-surface-600 hover:bg-surface-500 text-sm rounded transition-default"
        >
          {t('ui.startOver')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-content-primary">
          {t('ui.results')}
        </h1>
        {result.organizationName && (
          <p className="text-content-tertiary text-sm">{result.organizationName}</p>
        )}
      </div>

      {/* Overall Score + Archetype */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Overall Score Card */}
        <div className="bg-surface-700 border border-surface-400 rounded p-6 text-center">
          <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
            {t('ui.overallScore')}
          </div>
          <div className="text-4xl font-bold text-content-primary">
            {result.overallScore.toFixed(1)}
          </div>
          <div className="text-sm text-content-tertiary mt-1">
            {t(`level.${Math.round(Math.max(1, Math.min(5, result.overallScore)))}.name`)}
          </div>
        </div>

        {/* Archetype Card */}
        <div className="bg-surface-700 border border-surface-400 rounded p-6 text-center border-t-2 border-t-accent">
          <div className="text-xs text-content-muted uppercase tracking-wider mb-2">
            {t('ui.archetype')}
          </div>
          <div className="text-xl font-bold text-content-primary">
            {t(`arch.${result.archetype.id}.name`)}
          </div>
          <p className="text-xs text-content-tertiary mt-2 leading-relaxed line-clamp-3">
            {t(`arch.${result.archetype.id}.narrative`)}
          </p>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wider">
          {t('ui.dimensionScores')}
        </h2>
        <div className="space-y-2">
          {DIMENSION_ORDER.map((code) => {
            const score = result.dimensionScores[code];
            const value = score.adjusted ?? score.raw;

            return (
              <div key={code} className="flex items-center gap-3">
                <div className="w-24 text-xs text-content-secondary truncate">
                  {t(`dim.${code}.short`)}
                </div>
                <div className="flex-1 h-6 bg-surface-600 rounded-sm overflow-hidden relative">
                  <div
                    className={`h-full ${BAR_COLORS[code]} transition-all duration-700 ease-out rounded-sm`}
                    style={{ width: `${(value / 5) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-2">
                    <span
                      className={`text-[11px] font-semibold ${
                        value >= 2.5 ? 'text-white' : 'text-content-secondary'
                      }`}
                    >
                      {value.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-xs text-content-muted text-right">
                  {t(`level.${Math.round(Math.max(1, Math.min(5, value)))}.name`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contradictions */}
      {result.contradictions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wider">
            {t('ui.contradictions')} ({result.contradictions.length})
          </h2>
          <div className="space-y-2">
            {result.contradictions.map((c) => (
              <div
                key={c.ruleId}
                className={`bg-surface-700 border rounded p-4 ${
                  c.severity === 'CRITICAL'
                    ? 'border-severity-critical/40'
                    : c.severity === 'HIGH'
                      ? 'border-severity-high/40'
                      : 'border-surface-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      c.severity === 'CRITICAL'
                        ? 'bg-severity-critical/20 text-severity-critical'
                        : c.severity === 'HIGH'
                          ? 'bg-severity-high/20 text-severity-high'
                          : 'bg-severity-medium/20 text-severity-medium'
                    }`}
                  >
                    {t(`severity.${c.severity}`)}
                  </span>
                  <span className="text-sm font-medium text-content-primary">
                    {t(`contra.${c.ruleId}.name`)}
                  </span>
                </div>
                <p className="text-xs text-content-tertiary leading-relaxed">
                  {t(`contra.${c.ruleId}.narrative`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recommendations */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wider">
          {t('ui.recommendations')}
        </h2>
        <div className="space-y-2">
          {result.recommendations.slice(0, 6).map((rec) => (
            <div
              key={rec.id}
              className="bg-surface-700 border border-surface-400 rounded p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                  #{rec.priority}
                </span>
                <span className="text-xs text-content-muted">
                  {t(`dim.${rec.dimension}.short`)}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-[10px] text-content-muted uppercase tracking-wider mb-0.5">
                    {t('ui.quickWin')}
                  </div>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {t(`rec.${rec.id}.quickWin`)}
                  </p>
                </div>
                <div>
                  <div className="text-[10px] text-content-muted uppercase tracking-wider mb-0.5">
                    {t('ui.structuralMove')}
                  </div>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {t(`rec.${rec.id}.structural`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-surface-400">
        <button
          onClick={resetAssessment}
          className="px-6 py-2 bg-surface-600 hover:bg-surface-500 text-sm rounded transition-default"
        >
          {t('ui.startOver')}
        </button>
      </div>

      {/* Phase note */}
      <p className="text-center text-xs text-content-muted">
        {t('ui.phase3Note')}
      </p>
    </div>
  );
}
