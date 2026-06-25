import React from "react";
import { Button, Screen, Card, Typography, Grid } from "@/components";
import { Switch, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useGetCurrentUserQuery } from "@/api";
import { useThemePreference } from "@/styles/ThemePreference";
import { useModals } from "@/util/navigation/useModals";
import { personalSettingsScreenStyles } from "./styles";

export const PersonalSettingsScreen = () => {
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
              Settings
            </Typography>

            <View style={personalSettingsScreenStyles.settingRow}>
              <Typography>Dark Mode</Typography>

              <Switch
                value={theme.dark}
                onValueChange={(value) => {
                  setPreference(value ? "dark" : "light");
                }}
              />
            </View>
          </View>
        </Card>

        <Card title="Danger zone">
          <View style={personalSettingsScreenStyles.dangerZone}>
            <Typography color="onSurfaceVariant">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </Typography>

            <Button
              variant="danger"
              mode="contained"
              icon="remove"
              label="Delete account"
              onPress={() => open("confirm-delete-account")}
            />
          </View>
        </Card>
      </Grid>
    </Screen>
  );
};
