import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { Screen } from "@/components";

export const ProjectDocumentsScreen = () => {
  const { t } = useTranslation("projects");

  return (
    <Screen>
      <Text>{t("documents.placeholder")}</Text>
    </Screen>
  );
};
