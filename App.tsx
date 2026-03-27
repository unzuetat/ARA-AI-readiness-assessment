import { useStore } from './store';
import { I18nProvider, useTranslation, LOCALE_NAMES, type Locale } from './i18n';
import { DIMENSION_ORDER } from './data/dimensions';

function AppContent() {
  const phase = useStore((s) => s.phase);
  const { t, locale, setLocale } = useTranslation();

  return (
    <div className="min-h-screen bg-surface-800 text-content-primary">
      {/* Header */}
      <header className="border-b border-surface-400 bg-surface-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-accent/20 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-4 h-4">
                <polygon
                  points="16,4 28,26 4,26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  className="text-accent"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wide text-content-primary">
              {t('app.name')}
            </span>
            <span className="text-xs text-content-tertiary hidden sm:inline">
              {t('app.fullName')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {(Object.keys(LOCALE_NAMES) as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`px-2 py-1 text-xs rounded transition-default ${
                    locale === loc
                      ? 'bg-surface-500 text-content-primary'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <span className="text-xs text-content-muted">
              {t(`phase.${phase}`)}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {phase === 'welcome' && <WelcomePlaceholder />}
        {phase === 'assessment' && <AssessmentPlaceholder />}
        {phase === 'results' && <ResultsPlaceholder />}
      </main>

      <footer className="border-t border-surface-400 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-content-muted">{t('app.footer.author')}</span>
          <span className="text-xs text-content-muted">{t('app.footer.phase')}</span>
        </div>
      </footer>
    </div>
  );
}

function WelcomePlaceholder() {
  const setPhase = useStore((s) => s.setPhase);
  const { t } = useTranslation();

  const dimensions = DIMENSION_ORDER.map((code) => ({
    code,
    label: t(`dim.${code}.short`),
    color: `bg-dimension-${code.toLowerCase()}`,
  }));

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-content-primary">{t('welcome.title')}</h1>
        <p className="text-content-secondary text-lg leading-relaxed">{t('welcome.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto">
        {dimensions.map((d) => (
          <div
            key={d.code}
            className="flex items-center gap-2 px-3 py-2 bg-surface-700 rounded border border-surface-400"
          >
            <div className={`w-2 h-2 rounded-full ${d.color}`} />
            <span className="text-sm text-content-secondary">{d.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setPhase('assessment')}
          className="px-8 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded transition-default"
        >
          {t('welcome.cta')}
        </button>
        <p className="text-xs text-content-muted">{t('welcome.meta')}</p>
      </div>
    </div>
  );
}

function AssessmentPlaceholder() {
  const { currentDimension, currentQuestion, setPhase } = useStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
      <p className="text-content-secondary">Assessment UI — Phase 2</p>
      <p className="text-sm text-content-tertiary">
        {t('ui.dimensionOf', { current: currentDimension + 1, total: 6 })} ·{' '}
        {t('ui.questionOf', { current: currentQuestion + 1, total: 5 })}
      </p>
      <button
        onClick={() => setPhase('welcome')}
        className="px-6 py-2 bg-surface-600 hover:bg-surface-500 text-sm rounded transition-default"
      >
        {t('ui.back')}
      </button>
    </div>
  );
}

function ResultsPlaceholder() {
  const { result, resetAssessment } = useStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
      <p className="text-content-secondary">Results Dashboard — Phase 3</p>
      {result && (
        <div className="text-sm text-content-tertiary space-y-2">
          <p>{t('ui.overallScore')}: {result.overallScore.toFixed(1)}</p>
          <p>{t('ui.archetype')}: {t(`arch.${result.archetype.id}.name`)}</p>
          <p>{t('ui.contradictions')}: {result.contradictions.length}</p>
          <p>{t('ui.recommendations')}: {result.recommendations.length}</p>
        </div>
      )}
      <button
        onClick={resetAssessment}
        className="px-6 py-2 bg-surface-600 hover:bg-surface-500 text-sm rounded transition-default"
      >
        {t('ui.startOver')}
      </button>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
