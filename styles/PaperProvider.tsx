import React, { PropsWithChildren } from "react";
import { Icon } from "@/components/atoms/Icon";
import { PaperProvider as RNPPaperProvider } from "react-native-paper";
import { useColorScheme } from "./hooks";
import { lightTheme, darkTheme } from "./themes";
import { ThemePreferenceProvider, useThemePreference } from "./ThemePreference";

export const PaperProvider = ({
  children,
  scheme,
}: PropsWithChildren<{ scheme?: "light" | "dark" }>) => (
  <ThemePreferenceProvider>
    <ThemedPaperProvider scheme={scheme}>{children}</ThemedPaperProvider>
  </ThemePreferenceProvider>
);

const ThemedPaperProvider = ({
  children,
  scheme,
}: PropsWithChildren<{ scheme?: "light" | "dark" }>) => {
  const systemScheme = useColorScheme();
  const { preference } = useThemePreference();

  // An explicit user choice wins; otherwise follow the OS setting.
  const colorScheme = scheme ?? preference ?? systemScheme;

  return (
    <RNPPaperProvider
      theme={colorScheme === "dark" ? darkTheme : lightTheme}
      settings={{
        icon: ({ name, color, size }) => {
          return <Icon name={name} colorOverride={color} sizeOverride={size} />;
        },
      }}
    >
      {children}
    </RNPPaperProvider>
  );
};
