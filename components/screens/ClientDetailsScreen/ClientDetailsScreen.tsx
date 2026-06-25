import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components";

export const ClientDetailsScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  const { t } = useTranslation("clients");

  return (
    <Screen>
      <Text>{t("details.title")}</Text>
    </Screen>
  );
};
