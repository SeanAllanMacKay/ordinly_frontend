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

/**
 * Native display names for the language selector. Kept out of the translation
 * catalog so every language is shown in its own name regardless of the active
 * locale. Add an entry here when adding a language.
 */
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  es: "Español",
};

export const isSupportedLanguage = (value: unknown): value is Language =>
  typeof value === "string" &&
  (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

/**
 * Map a BCP-47 language tag (e.g. "en-US") to a supported catalog language by
 * its primary subtag, or `undefined` if unsupported. The backend stores full
 * BCP-47 tags while the catalog only ships `en`/`es`, so inbound tags are
 * normalized here before being handed to i18next.
 */
export const normalizeLanguageTag = (
  value: unknown,
): Language | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const primarySubtag = value.split("-")[0]?.toLowerCase();
  return isSupportedLanguage(primarySubtag) ? primarySubtag : undefined;
};

export const isRtlLanguage = (language: string): boolean =>
  RTL_LANGUAGES.includes(language);
