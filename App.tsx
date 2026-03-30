import { useState, useEffect } from 'react';
import { useStore } from './store';
import { I18nProvider, useTranslation, LOCALE_NAMES, type Locale } from './i18n';
import WelcomeView from './views/WelcomeView';
import AssessmentView from './views/AssessmentView';
import ResultsView from './views/ResultsView';

function detectTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('ara-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function AppContent() {
  const phase = useStore((s) => s.phase);
  const { t, locale, setLocale } = useTranslation();
  const [theme, setThemeState] = useState<'light' | 'dark'>(detectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('ara-theme', theme);
  }, [theme]);

  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-page text-fg flex flex-col transition-theme">
      {/* Header */}
      <header className="border-b border-theme transition-theme">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold text-fg tracking-tight">
              ARA
            </span>
            <span className="text-xs text-fg3 hidden sm:inline">
              {t('app.fullName')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            {(Object.keys(LOCALE_NAMES) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`px-2 py-1 text-xs border transition-default ${
                  locale === loc
                    ? 'border-strong text-fg'
                    : 'border-theme text-fg3 hover:text-fg2'
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="px-2 py-1 text-xs border border-theme text-fg3 hover:text-fg2 transition-default ml-1"
            >
              {theme === 'dark' ? t('ui.themeLight') : t('ui.themeDark')}
            </button>

            {/* Phase indicator */}
            <span className="text-xs text-muted ml-2 hidden sm:inline">
              {t(`phase.${phase}`)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8 flex-1 w-full">
        {phase === 'welcome' && <WelcomeView />}
        {phase === 'assessment' && <AssessmentView />}
        {phase === 'results' && <ResultsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-theme transition-theme">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="text-xs text-fg3">{t('app.footer.author')}</span>
          <span className="text-xs text-fg3">{t('app.footer.phase')}</span>
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
