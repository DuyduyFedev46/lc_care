import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.json';

/**
 * Resolve the initial UI language using priority chain:
 *   1. localStorage.lc_lang (user's explicit choice — per-origin, safe)
 *   2. VITE_DEFAULT_LANG build-time env
 *   3. 'vi' hard default
 *
 * Exported so AppContext can import it and stay in sync (single source of truth).
 */
export function resolveInitialLang() {
  const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('lc_lang')) || null;
  return stored || import.meta.env.VITE_DEFAULT_LANG || 'vi';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
    },
    lng: resolveInitialLang(),
    fallbackLng: 'vi',
    interpolation: { escapeValue: false },
  });

export default i18n;
