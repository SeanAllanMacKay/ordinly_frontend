import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Card, Typography } from "@/components";
import { useModals } from "@/util/navigation/useModals";
import { personalSettingsScreenStyles as styles } from "./styles";

// Destructive / sensitive actions, each gated behind a confirmation modal.
export const DangerZoneCard = () => {
  const { t } = useTranslation("common");
  const { open } = useModals();

  return (
    <View style={styles.dangerZone}>
      <View style={styles.header}>
        <Typography size="lg" emphasis="high">
          {t("dangerZone")}
        </Typography>
      </View>

      <View style={styles.dangerRow}>
        <Typography color="onSurfaceVariant">
          {t("changePassword.description")}
        </Typography>

        <Button
          variant="secondary"
          mode="outlined"
          icon="edit"
          label={t("changePassword.title")}
          onPress={() => open("change-password")}
        />
      </View>

      <View style={styles.dangerRow}>
        <Typography color="onSurfaceVariant">
          {t("settings.deleteDescription")}
        </Typography>

        <Button
          variant="danger"
          mode="contained"
          icon="remove"
          label={t("settings.deleteAccount")}
          onPress={() => open("confirm-delete-account")}
        />
      </View>
    </View>
  );
};
