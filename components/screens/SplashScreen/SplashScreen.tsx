import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { splashScreenStyles } from "./styles";

export const SplashScreen = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        splashScreenStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};
