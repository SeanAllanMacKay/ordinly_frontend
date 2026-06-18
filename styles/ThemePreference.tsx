import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@ordinly/color-scheme-preference";

export type ColorSchemePreference = "light" | "dark";

type ThemePreferenceContextValue = {
  /** The user's explicit choice, or `null` to follow the OS setting. */
  preference: ColorSchemePreference | null;
  setPreference: (preference: ColorSchemePreference | null) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue>({
  preference: null,
  setPreference: () => {},
});

export const useThemePreference = () => useContext(ThemePreferenceContext);

export const ThemePreferenceProvider = ({ children }: PropsWithChildren) => {
  const [preference, setPreferenceState] =
    useState<ColorSchemePreference | null>(null);

  // Hydrate the persisted choice on mount.
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (active && (stored === "light" || stored === "dark")) {
        setPreferenceState(stored);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const setPreference = (next: ColorSchemePreference | null) => {
    setPreferenceState(next);
    if (next === null) {
      AsyncStorage.removeItem(STORAGE_KEY);
    } else {
      AsyncStorage.setItem(STORAGE_KEY, next);
    }
  };

  return (
    <ThemePreferenceContext.Provider value={{ preference, setPreference }}>
      {children}
    </ThemePreferenceContext.Provider>
  );
};
