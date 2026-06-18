import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./themes";

/**
 * Overrides the Paper theme for a subtree WITHOUT introducing the layout
 * wrappers (SafeAreaProviderCompat + PortalHost, both `flex: 1`) that a nested
 * `PaperProvider` adds. Use this to force a section into a fixed scheme — e.g.
 * an always-dark sidebar — while only the colors change, not the layout.
 *
 * Kept as a leaf module (only depends on react-native-paper + theme tokens) so
 * importing it never drags `@/components` back into a barrel cycle.
 */
export const ThemeScope = ({
  children,
  scheme,
}: PropsWithChildren<{ scheme: "light" | "dark" }>) => (
  <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
    {children}
  </ThemeProvider>
);
