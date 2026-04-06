import React, { PropsWithChildren } from "react";
import { Icon } from "@/components/atoms/Icon";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider as RNPPaperProvider,
} from "react-native-paper";
import { useColorScheme } from "./hooks";
import { Colors } from "./Colors";

const commonTheme = {
  ...DefaultTheme,
  roundness: 4,
};

const lightTheme = {
  ...commonTheme,
  dark: false,
  colors: Colors.light,
};

const darkTheme = {
  ...commonTheme,
  dark: true,
  colors: Colors.dark,
};

export const PaperProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <RNPPaperProvider
      theme={colorScheme === "dark" ? darkTheme : lightTheme}
      settings={{
        icon: ({ name, color, size }) => {
          return <Icon name={name} colorOverride={color} />;
        },
      }}
    >
      {children}
    </RNPPaperProvider>
  );
};
