import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DevSettings, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nextProvider } from "react-i18next";

import { useGetCurrentUserQuery, useUpdateUserMutation } from "@/api";
import { SplashScreen } from "@/components/screens";
import i18n, { initI18n } from "./index";
import {
  LANGUAGE_STORAGE_KEY,
  isRtlLanguage,
  normalizeLanguageTag,
  type Language,
} from "./config";

type LanguagePreferenceContextValue = {
  /** The active language code (e.g. "en"). */
  language: string;
  /** Persist and apply a new language; re-renders all consumers. */
  setLanguage: (language: Language) => void;
};

const LanguagePreferenceContext =
  createContext<LanguagePreferenceContextValue>({
    language: i18n.language,
    setLanguage: () => {},
  });

export const useLanguagePreference = () =>
  useContext(LanguagePreferenceContext);

/**
 * Initialises i18next once and gates render on a splash until resources +
 * detected language are ready (mirrors the auth gate in `app/_layout.tsx`).
 * Wrap the app below the providers that don't need translations and above
 * `PaperProvider` so theme/Paper text can call `t()`.
 */
export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [ready, setReady] = useState(i18n.isInitialized);
  const [language, setLanguageState] = useState<string>(i18n.language);

  const userQuery = useGetCurrentUserQuery();
  const updateUserMutation = useUpdateUserMutation();
  const backendLanguage = userQuery.data?.user?.preferredLanguage;

  useEffect(() => {
    let active = true;
    initI18n().then((instance) => {
      if (active) {
        setLanguageState(instance.language);
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Backend value is the source of truth: once the current-user query resolves,
  // apply its language and cache the raw BCP-47 tag locally so a later (possibly
  // offline) boot reads it back as the persisted value. Covers login, sign-up,
  // and persistent/cold-start auth via the single current-user query.
  useEffect(() => {
    if (!ready || !backendLanguage) {
      return;
    }

    const normalized = normalizeLanguageTag(backendLanguage);
    if (!normalized || normalized === i18n.language) {
      return;
    }

    setLanguageState(normalized);
    i18n.changeLanguage(normalized);
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, backendLanguage);
  }, [ready, backendLanguage]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    i18n.changeLanguage(next);

    // Persist to the backend when signed in so the choice follows the user
    // across devices/sessions. Fire-and-forget — the local apply above already
    // gives instant feedback.
    if (userQuery.data) {
      updateUserMutation.mutate({ preferredLanguage: next });
    }

    // Layout direction only flips on a native reload. en/es are both LTR, so
    // this is dormant today; when an RTL language is added, switching to/from
    // it triggers the reload. Same-direction switches re-render instantly.
    const nextIsRtl = isRtlLanguage(next);
    if (I18nManager.isRTL !== nextIsRtl) {
      I18nManager.allowRTL(nextIsRtl);
      I18nManager.forceRTL(nextIsRtl);
      // In production add `expo-updates` and call `Updates.reloadAsync()`.
      DevSettings.reload();
    }
  };

  if (!ready) {
    return <SplashScreen />;
  }

  return (
    <LanguagePreferenceContext.Provider value={{ language, setLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguagePreferenceContext.Provider>
  );
};
