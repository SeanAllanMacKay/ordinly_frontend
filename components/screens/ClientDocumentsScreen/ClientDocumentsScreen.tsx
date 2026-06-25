import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components";

export const ClientDocumentsScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  const { t } = useTranslation("clients");

  return (
    <Screen>
      <Text>{t("documents.title")}</Text>
    </Screen>
  );
};
