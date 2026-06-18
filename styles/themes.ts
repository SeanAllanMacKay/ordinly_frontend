import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { Colors } from "./Colors";

const commonTheme = {
  ...DefaultTheme,
  roundness: 4,
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
