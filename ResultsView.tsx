import { useTranslation } from '../i18n';
import { useStore } from '../store';
import { DIMENSION_ORDER } from '../data/dimensions';
import { BENCHMARKS } from '../data/benchmarks';
import RadarChart from '../components/results/RadarChart';
import DimensionDetail from '../components/results/DimensionDetail';
import type { DimensionCode } from '../types';

const DIM_COLORS: Record<DimensionCode, string> = {
  STR: 'var(--dim-str)',
  DAT: 'var(--dim-dat)',
  TAL: 'var(--dim-tal)',
  GOV: 'var(--dim-gov)',
  CUL: 'var(--dim-cul)',
  PRO: 'var(--dim-pro)',
};

export default function ResultsView() {
  const { t } = useTranslation();
  const { result, resetAssessment } = useStore();

  if (!result) {
    return (
      <div className="text-center py-16">
        <p className="text-fg2">{t('ui.noResults')}</p>
        <button
          onClick={resetAssessment}
          className="mt-4 px-6 py-2 border border-theme text-sm hover:bg-surface transition-default"
        >
          {t('ui.startOver')}
        </button>
      </div>
    );
  }

  const benchmark = result.industry
    ? BENCHMARKS.find((b) => b.industry === result.industry)
    : undefined;

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-xs tracking-widest uppercase text-fg3">
          {t('ui.resultsEyebrow')}
        </div>
        <h1 className="font-serif text-3xl font-normal text-fg">
          {t('ui.results')}
        </h1>
        {result.organizationName && (
          <p className="text-fg3 text-sm">{result.organizationName}</p>
        )}
      </div>

      {/* Radar Chart */}
      <div className="py-4">
        <RadarChart
          scores={result.dimensionScores}
          benchmarkScores={benchmark?.scores}
        />
      </div>

      {/* Overall Score + Archetype */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
        <div className="bg-page p-6 text-center transition-theme">
          <div className="text-[10px] tracking-widest uppercase text-fg3 mb-2">
            {t('ui.overallScore')}
          </div>
          <div className="font-serif text-4xl font-normal text-fg">
            {result.overallScore.toFixed(1)}
          </div>
          <div className="text-sm text-fg3 mt-1">
            {t(`level.${Math.round(Math.max(1, Math.min(5, result.overallScore)))}.name`)}
          </div>
        </div>

        <div className="bg-page p-6 text-center transition-theme">
          <div className="text-[10px] tracking-widest uppercase text-fg3 mb-2">
            {t('ui.archetype')}
          </div>
          <div className="font-serif text-xl font-normal italic text-fg">
            {t(`arch.${result.archetype.id}.name`)}
          </div>
          <p className="text-xs text-fg3 mt-2 leading-relaxed line-clamp-3">
            {t(`arch.${result.archetype.id}.narrative`)}
          </p>
        </div>
      </div>

      {/* Dimension Details — Expandable */}
      <div className="space-y-3">
        <h2 className="text-[10px] tracking-widest uppercase text-fg3">
          {t('ui.dimensionScores')}
        </h2>
        <div className="space-y-2">
          {DIMENSION_ORDER.map((code) => (
            <DimensionDetail
              key={code}
              code={code}
              score={result.dimensionScores[code]}
              color={DIM_COLORS[code]}
            />
          ))}
        </div>
      </div>

      {/* Contradictions */}
      {result.contradictions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[10px] tracking-widest uppercase text-fg3">
            {t('ui.contradictions')} ({result.contradictions.length})
          </h2>
          <div className="space-y-2">
            {result.contradictions.map((c) => (
              <div
                key={c.ruleId}
                className="border border-theme p-5 transition-theme"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-semibold uppercase px-2 py-0.5"
                    style={{
                      backgroundColor:
                        c.severity === 'CRITICAL' ? 'rgba(190,18,60,0.1)' :
                        c.severity === 'HIGH' ? 'rgba(180,83,9,0.1)' :
                        'rgba(67,56,202,0.1)',
                      color:
                        c.severity === 'CRITICAL' ? '#BE123C' :
                        c.severity === 'HIGH' ? '#B45309' :
                        '#4338CA',
                    }}
                  >
                    {t(`severity.${c.severity}`)}
                  </span>
                  <span className="text-[15px] font-medium text-fg">
                    {t(`contra.${c.ruleId}.name`)}
                  </span>
                </div>
                <p className="text-sm text-fg2 leading-relaxed">
                  {t(`contra.${c.ruleId}.narrative`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recommendations */}
      <div className="space-y-3">
        <h2 className="text-[10px] tracking-widest uppercase text-fg3">
          {t('ui.recommendations')}
        </h2>
        <div className="space-y-2">
          {result.recommendations.slice(0, 6).map((rec) => (
            <div key={rec.id} className="border border-theme p-5 transition-theme">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif text-sm italic text-fg3">#{rec.priority}</span>
                <span className="text-xs text-fg3">{t(`dim.${rec.dimension}.short`)}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-fg3 mb-1">
                    {t('ui.quickWin')}
                  </div>
                  <p className="text-sm text-fg2 leading-relaxed">
                    {t(`rec.${rec.id}.quickWin`)}
                  </p>
                </div>
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-fg3 mb-1">
                    {t('ui.structuralMove')}
                  </div>
                  <p className="text-sm text-fg2 leading-relaxed">
                    {t(`rec.${rec.id}.structural`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-theme">
        <button
          onClick={resetAssessment}
          className="px-6 py-2 border border-theme text-sm hover:bg-surface transition-default"
        >
          {t('ui.startOver')}
        </button>
      </div>

      <p className="text-center text-xs text-fg3">
        {t('ui.phase3Note')}
      </p>
    </div>
  );
}
