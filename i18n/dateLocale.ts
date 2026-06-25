import { enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";

/**
 * Map an i18next language code to its date-fns `Locale`. Passing the locale to
 * `format(..., { locale })` localizes month/day names without changing the
 * format pattern string. Add an entry here when adding a language.
 */
const DATE_FNS_LOCALES: Record<string, Locale> = {
  en: enUS,
  es,
};

export const dateFnsLocale = (language: string): Locale =>
  DATE_FNS_LOCALES[language] ?? enUS;
