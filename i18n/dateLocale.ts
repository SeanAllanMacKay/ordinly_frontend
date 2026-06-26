import {
  enUS,
  enGB,
  enCA,
  es,
  pt,
  ptBR,
  fr,
  frCA,
  de,
} from "date-fns/locale";
import type { Locale } from "date-fns";

import { normalizeLanguageTag } from "./config";

/**
 * Map an i18next locale (a regional BCP-47 tag like "en-GB") to its date-fns
 * `Locale`. Passing the locale to `format(..., { locale })` localizes
 * month/day names and — with a localized pattern token — the date order. Keyed
 * by full tag so regional conventions (en-US vs en-GB) are honoured; falls back
 * to the base language, then `enUS`. Add an entry here when adding a locale.
 *
 * Note: date-fns has no Mexican-Spanish locale, so `es-MX` reuses `es`; that
 * dialect's number/currency differences surface via `Intl` instead.
 */
const DATE_FNS_LOCALES: Record<string, Locale> = {
  "en-US": enUS,
  "en-GB": enGB,
  "en-CA": enCA,
  "es-ES": es,
  "es-MX": es,
  "pt-PT": pt,
  "pt-BR": ptBR,
  "fr-FR": fr,
  "fr-CA": frCA,
  "de-DE": de,
  // Base-language fallbacks for bare codes.
  en: enUS,
  es,
  pt,
  fr,
  de,
};

export const dateFnsLocale = (language: string): Locale =>
  DATE_FNS_LOCALES[language] ??
  DATE_FNS_LOCALES[normalizeLanguageTag(language) ?? ""] ??
  enUS;
