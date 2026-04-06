import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Button, Screen, Card, Typography, Grid } from "@/components";
import { Switch, useTheme } from "react-native-paper";
import { Appearance, Platform, View } from "react-native";
import { useGetCurrentUserQuery } from "@/api";
import { Spacing } from "@/styles";

export default function Account() {
  const navigation = useNavigation();
  const theme = useTheme();
  const userQuery = useGetCurrentUserQuery();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Account" });
  }, [navigation]);

  return (
    <Screen>
      <Grid>
        <Card
          title={userQuery?.data?.user?.name}
          subtitle={userQuery?.data?.user?.email}
          headerRight={<Button icon="edit" />}
        >
          {Platform.OS !== "web" ? (
            <View>
              <Typography size="lg" color="onSurfaceVariant">
                Settings
              </Typography>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: Spacing.md,
                }}
              >
                <Typography>Dark Mode</Typography>

                <Switch
                  value={theme.dark}
                  onValueChange={() => {
                    const newColorScheme = theme.dark ? "light" : "dark";
                    Appearance.setColorScheme(newColorScheme);
                  }}
                />
              </View>
            </View>
          ) : null}
        </Card>
      </Grid>
    </Screen>
  );
}
