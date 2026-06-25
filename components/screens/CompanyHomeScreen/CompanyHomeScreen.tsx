import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components";

export const CompanyHomeScreen = () => {
  const { t } = useTranslation("companies");

  return (
    <Screen>
      <Text>{t("home.dashboard")}</Text>
    </Screen>
  );
};
