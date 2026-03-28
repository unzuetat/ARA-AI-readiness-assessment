import { useStore } from './store';
import { I18nProvider, useTranslation, LOCALE_NAMES, type Locale } from './i18n';
import WelcomeView from './views/WelcomeView';
import AssessmentView from './views/AssessmentView';
import ResultsView from './views/ResultsView';

function AppContent() {
  const phase = useStore((s) => s.phase);
  const { t, locale, setLocale } = useTranslation();

  return (
    <div className="min-h-screen bg-surface-800 text-content-primary flex flex-col">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full">
        {phase === 'welcome' && <WelcomeView />}
        {phase === 'assessment' && <AssessmentView />}
        {phase === 'results' && <ResultsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-400">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-content-muted">{t('app.footer.author')}</span>
          <span className="text-xs text-content-muted">{t('app.footer.phase')}</span>
        </div>
      </footer>
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
