/**
 * Static i18n configuration shared by the runtime instance, the language
 * provider, and the catalog extraction tooling.
 *
 * Two concepts are kept distinct:
 *   - **Language** (base catalog): `en`/`es`/`pt`/`fr`/`de`. One translation
 *     catalog per base language lives under `i18n/locales/<code>/`, and i18next
 *     falls back regional → base → `en` for text.
 *   - **Locale** (user-facing region): e.g. `en-GB`, `es-MX`. This is what the
 *     user selects, what is persisted (storage + backend `preferredLanguage`),
 *     and what `i18n.language` is set to — so date/number/currency formatting is
 *     region-aware while text is shared across a base language's regions.
 *
 * To add a base language: add its code to `SUPPORTED_LANGUAGES`, drop a matching
 * folder under `i18n/locales/<code>/` with the same namespace filenames, and
 * register it in `resources.ts`. To add a region: add its tag to
 * `SUPPORTED_LOCALES`, a `LOCALE_LABELS` entry, and (for dates) a `dateLocale.ts`
 * mapping; if it's the first region for a new base language, also add a
 * `DEFAULT_LOCALE_FOR_BASE` entry.
 */

export const SUPPORTED_LANGUAGES = ["en", "es", "pt", "fr", "de"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const FALLBACK_LANGUAGE: Language = "en";

/**
 * User-facing regional locales as BCP-47 tags. Each maps to a base language
 * catalog for text and drives region-aware formatting (dates/numbers/currency).
 */
export const SUPPORTED_LOCALES = [
  "en-US",
  "en-GB",
  "en-CA",
  "es-ES",
  "es-MX",
  "pt-PT",
  "pt-BR",
  "fr-FR",
  "fr-CA",
  "de-DE",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const FALLBACK_LOCALE: Locale = "en-US";

/**
 * Catalog namespaces, partitioned by feature/entity to mirror the
 * `components/screens/*` and `app/(authenticated)/manage/*` domain split.
 * Each namespace maps to one JSON file per language.
 */
export const NAMESPACES = [
  "common",
  "auth",
  "validation",
  "projects",
  "tasks",
  "clients",
  "companies",
  "documents",
  "navigation",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

export const DEFAULT_NS: Namespace = "common";

/** AsyncStorage key for the user's explicit language override. */
export const LANGUAGE_STORAGE_KEY = "@ordinly/language-preference";

/** Languages that require a right-to-left layout (none yet, wired for future). */
export const RTL_LANGUAGES: readonly string[] = ["ar", "he", "fa", "ur"];

/**
 * Native display names for the locale selector. Kept out of the translation
 * catalog so every locale is shown in its own name regardless of the active
 * locale. Add an entry here when adding a locale.
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  "en-CA": "English (Canada)",
  "es-ES": "Español (España)",
  "es-MX": "Español (México)",
  "pt-PT": "Português (Portugal)",
  "pt-BR": "Português (Brasil)",
  "fr-FR": "Français (France)",
  "fr-CA": "Français (Canada)",
  "de-DE": "Deutsch",
};

export const isSupportedLanguage = (value: unknown): value is Language =>
  typeof value === "string" &&
  (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

export const isSupportedLocale = (value: unknown): value is Locale =>
  typeof value === "string" &&
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

/**
 * The default region to assume for each base language when a tag carries no
 * supported region (e.g. a bare `en` from an older backend row, or an
 * unsupported region like `en-AU`).
 */
export const DEFAULT_LOCALE_FOR_BASE: Record<Language, Locale> = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-PT",
  fr: "fr-FR",
  de: "de-DE",
};

/** Extract the lowercased primary subtag of a BCP-47 tag (e.g. "en-US" → "en"). */
const primarySubtag = (value: string): string | undefined =>
  value.split("-")[0]?.toLowerCase();

/**
 * Map a BCP-47 language tag (e.g. "en-US") to a supported catalog language by
 * its primary subtag, or `undefined` if unsupported. Used for resource fallback
 * and RTL decisions, which operate on the base language rather than the region.
 */
export const normalizeLanguageTag = (
  value: unknown,
): Language | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const subtag = primarySubtag(value);
  return isSupportedLanguage(subtag) ? subtag : undefined;
};

/**
 * Map an arbitrary BCP-47 tag to the nearest supported regional locale:
 *   1. exact match against `SUPPORTED_LOCALES` (e.g. "en-GB" → "en-GB"), else
 *   2. the base language's default region (e.g. "en-AU"/"en" → "en-US"), else
 *   3. `undefined`.
 *
 * The backend stores full BCP-47 tags in `preferredLanguage`; inbound tags are
 * normalized here before being handed to i18next and the selector.
 */
export const normalizeLocale = (value: unknown): Locale | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  if (isSupportedLocale(value)) {
    return value;
  }

  const base = normalizeLanguageTag(value);
  return base ? DEFAULT_LOCALE_FOR_BASE[base] : undefined;
};

export const isRtlLanguage = (language: string): boolean =>
  RTL_LANGUAGES.includes(language);
