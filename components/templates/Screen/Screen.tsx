import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { screenStyles } from "./styles";
import { ScreenProps } from "./types";

export const Screen = ({ children, isLoading }: ScreenProps) => {
  const theme = useTheme();
  const { t } = useTranslation("common");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        screenStyles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {isLoading ? (
        <View style={screenStyles.loadingContainer}>
          <Text>{t("loading")}</Text>
        </View>
      ) : (
        <View style={screenStyles.contentContainer}>{children}</View>
      )}
    </KeyboardAvoidingView>
  );
};
