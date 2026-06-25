/**
 * Static i18n configuration shared by the runtime instance, the language
 * provider, and the catalog extraction tooling.
 *
 * To add a language: add its code to `SUPPORTED_LANGUAGES`, drop a matching
 * folder under `i18n/locales/<code>/` with the same namespace filenames, and
 * register it in `resources.ts`. No component changes required.
 */

export const SUPPORTED_LANGUAGES = ["en", "es"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const FALLBACK_LANGUAGE: Language = "en";

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

export const isSupportedLanguage = (value: unknown): value is Language =>
  typeof value === "string" &&
  (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

export const isRtlLanguage = (language: string): boolean =>
  RTL_LANGUAGES.includes(language);
