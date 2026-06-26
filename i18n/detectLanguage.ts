import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FALLBACK_LOCALE,
  LANGUAGE_STORAGE_KEY,
  normalizeLocale,
  type Locale,
} from "./config";

/** The device's preferred language as a raw BCP-47 tag (e.g. "en-US"). */
export const getDeviceLanguageTag = (): string | undefined =>
  Localization.getLocales()[0]?.languageTag;

/**
 * Resolve the locale to boot with:
 *   1. the user's persisted value (if it normalizes to a supported locale), else
 *   2. the device's preferred locale (if it normalizes), else
 *   3. the fallback locale.
 *
 * The backend value takes effective top priority across sessions: once the
 * current-user query resolves, its `preferredLanguage` is written to storage,
 * so the next (possibly offline) boot reads it here as the persisted value.
 */
export async function resolveInitialLanguage(): Promise<Locale> {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const storedLocale = normalizeLocale(stored);
  if (storedLocale) {
    return storedLocale;
  }

  const deviceLocale = normalizeLocale(getDeviceLanguageTag());
  if (deviceLocale) {
    return deviceLocale;
  }

  return FALLBACK_LOCALE;
}
