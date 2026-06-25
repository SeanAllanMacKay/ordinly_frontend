import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Screen, Typography } from "@/components";
import { useModals } from "@/util/navigation/useModals";
import { Spacing } from "@/styles";

export const CompanySettingsScreen = () => {
  const { t } = useTranslation("companies");
  const { open } = useModals();

  return (
    <Screen>
      <View style={{ padding: Spacing.md, gap: Spacing.md }}>
        <Typography emphasis="high">{t("dangerZone")}</Typography>
        <Typography>{t("settings.deleteDescription")}</Typography>
        <View style={{ flexDirection: "row" }}>
          <Button
            variant="danger"
            mode="contained"
            icon="remove"
            label={t("settings.deleteCompany")}
            onPress={() => open("confirm-delete-company")}
          />
        </View>
      </View>
    </Screen>
  );
};
