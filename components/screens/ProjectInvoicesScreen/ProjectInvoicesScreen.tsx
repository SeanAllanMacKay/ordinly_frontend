import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { Screen } from "@/components";

export const ProjectInvoicesScreen = () => {
  const { t } = useTranslation("projects");

  return (
    <Screen>
      <Text>{t("invoices.placeholder")}</Text>
    </Screen>
  );
};
