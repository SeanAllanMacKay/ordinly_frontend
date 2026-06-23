import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { Colors } from "./Colors";
import { Spacing } from "./Spacing";

const commonTheme = {
  ...DefaultTheme,
  roundness: Spacing.md,
};

export const lightTheme = {
  ...commonTheme,
  dark: false,
  colors: Colors.light,
};

export const darkTheme = {
  ...commonTheme,
  dark: true,
  colors: Colors.dark,
};
