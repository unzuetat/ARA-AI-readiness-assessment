import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { en } from './en';
import { es } from './es';

// ============================================================
// i18n System — Lightweight, no dependencies
// ============================================================
 
export type Locale = 'en' | 'es';

export type TranslationDictionary = Record<string, string>;

const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  en,
  es,
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

// ─── Context ────────────────────────────────────────────────

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────

function detectLocale(): Locale {
  // 1. Check localStorage
  const stored = localStorage.getItem('ara-locale');
  if (stored === 'en' || stored === 'es') return stored;

  // 2. Check browser language
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === 'es') return 'es';

  // 3. Default
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('ara-locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = DICTIONARIES[locale][key];

      // Fallback to English if key not found in current locale
      if (value === undefined) {
        value = DICTIONARIES.en[key];
      }

      // If still not found, return the key itself (makes missing translations visible)
      if (value === undefined) {
        console.warn(`[i18n] Missing translation: "${key}" for locale "${locale}"`);
        return key;
      }

      // Parameter substitution: {{paramName}}
      if (params) {
        for (const [paramKey, paramValue] of Object.entries(params)) {
          value = value.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), String(paramValue));
        }
      }

      return value;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
