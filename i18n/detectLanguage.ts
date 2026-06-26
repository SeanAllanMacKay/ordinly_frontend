import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  normalizeLanguageTag,
  type Language,
} from "./config";

/** The device's preferred language as a raw BCP-47 tag (e.g. "en-US"). */
export const getDeviceLanguageTag = (): string | undefined =>
  Localization.getLocales()[0]?.languageTag;

/**
 * Resolve the language to boot with:
 *   1. the user's persisted value (if it normalizes to a supported language), else
 *   2. the device's preferred language (if supported), else
 *   3. the fallback language.
 *
 * The backend value takes effective top priority across sessions: once the
 * current-user query resolves, its `preferredLanguage` is written to storage,
 * so the next (possibly offline) boot reads it here as the persisted value.
 */
export async function resolveInitialLanguage(): Promise<Language> {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const storedLanguage = normalizeLanguageTag(stored);
  if (storedLanguage) {
    return storedLanguage;
  }

  const deviceLanguage = normalizeLanguageTag(getDeviceLanguageTag());
  if (deviceLanguage) {
    return deviceLanguage;
  }

  return FALLBACK_LANGUAGE;
}
