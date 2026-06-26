// Polyfill Intl.PluralRules so i18next resolves CLDR plural categories on Hermes.
import "intl-pluralrules";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";
import {
  DEFAULT_NS,
  FALLBACK_LANGUAGE,
  NAMESPACES,
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  type Locale,
} from "./config";
import { resolveInitialLanguage } from "./detectLanguage";

let initPromise: Promise<typeof i18n> | undefined;

/**
 * Initialise the shared i18next instance exactly once. Resources are bundled
 * synchronously, so the only async work is resolving the initial language from
 * storage/device. Safe to call repeatedly — subsequent calls return the same
 * promise.
 */
export function initI18n(): Promise<typeof i18n> {
  if (!initPromise) {
    initPromise = resolveInitialLanguage().then(async (lng: Locale) => {
      if (!i18n.isInitialized) {
        await i18n.use(initReactI18next).init({
          resources,
          lng,
          fallbackLng: FALLBACK_LANGUAGE,
          // Accept regional tags (e.g. "en-GB") and base codes. With
          // `nonExplicitSupportedLngs`, a region resolves text via its base
          // catalog while `i18n.language` keeps the region for formatting.
          // (Do NOT set `load: "languageOnly"` — it would strip the region.)
          supportedLngs: [...SUPPORTED_LOCALES, ...SUPPORTED_LANGUAGES],
          nonExplicitSupportedLngs: true,
          ns: NAMESPACES as unknown as string[],
          defaultNS: DEFAULT_NS,
          // Generic keys (e.g. "save", "error") resolve from `common` even when
          // a component's `t` is bound to another namespace.
          fallbackNS: DEFAULT_NS,
          // Markup is rendered by React Native, not a browser — no XSS surface.
          interpolation: { escapeValue: false },
          returnNull: false,
          compatibilityJSON: "v4",
          react: {
            // Resources are preloaded; the explicit gate in LanguageProvider
            // handles the only async step, so Suspense buys nothing here and
            // risks react-native-web hydration warnings.
            useSuspense: false,
          },
        });
      }
      return i18n;
    });
  }
  return initPromise;
}

export default i18n;
