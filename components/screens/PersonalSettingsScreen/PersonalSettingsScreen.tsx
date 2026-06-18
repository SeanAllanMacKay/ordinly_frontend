import React from "react";
import { Button, Screen, Card, Typography, Grid } from "@/components";
import { Switch, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useGetCurrentUserQuery } from "@/api";
import { useThemePreference } from "@/styles/ThemePreference";
import { personalSettingsScreenStyles } from "./styles";

export const PersonalSettingsScreen = () => {
  const theme = useTheme();
  const userQuery = useGetCurrentUserQuery();
  const { setPreference } = useThemePreference();

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
      </Grid>
    </Screen>
  );
};
