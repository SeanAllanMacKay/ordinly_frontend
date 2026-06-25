import React from "react";
import { Button, Screen, Card, Typography, Grid } from "@/components";
import { Switch, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useGetCurrentUserQuery } from "@/api";
import { useThemePreference } from "@/styles/ThemePreference";
import { useModals } from "@/util/navigation/useModals";
import { personalSettingsScreenStyles } from "./styles";

export const PersonalSettingsScreen = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const userQuery = useGetCurrentUserQuery();
  const { setPreference } = useThemePreference();
  const { open } = useModals();

  return (
    <Screen>
      <Grid>
        <Card
          title={userQuery?.data?.user?.name}
          subtitle={userQuery?.data?.user?.email}
          headerRight={<Button icon="edit" />}
        >
          <View>
            <Typography size="lg" color="onSurfaceVariant">
              {t("settings.title")}
            </Typography>

            <View style={personalSettingsScreenStyles.settingRow}>
              <Typography>{t("settings.darkMode")}</Typography>

              <Switch
                value={theme.dark}
                onValueChange={(value) => {
                  setPreference(value ? "dark" : "light");
                }}
              />
            </View>
          </View>
        </Card>

        <Card title={t("dangerZone")}>
          <View style={personalSettingsScreenStyles.dangerZone}>
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
        </Card>
      </Grid>
    </Screen>
  );
};
