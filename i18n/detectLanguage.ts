import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  isSupportedLanguage,
  type Language,
} from "./config";

/**
 * Resolve the language to boot with:
 *   1. the user's persisted explicit choice (if still supported), else
 *   2. the device's preferred language (if supported), else
 *   3. the fallback language.
 */
export async function resolveInitialLanguage(): Promise<Language> {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(stored)) {
    return stored;
  }

  const deviceLanguage = Localization.getLocales()[0]?.languageCode;
  if (isSupportedLanguage(deviceLanguage)) {
    return deviceLanguage;
  }

  return FALLBACK_LANGUAGE;
}
