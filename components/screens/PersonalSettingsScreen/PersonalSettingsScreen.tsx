import React from "react";
import { ScrollView } from "react-native";
import { Screen, Grid } from "@/components";
import { AccountDetailsCard } from "./AccountDetailsCard";
import { SettingsCard } from "./SettingsCard";
import { DangerZoneCard } from "./DangerZoneCard";
import { personalSettingsScreenStyles as styles } from "./styles";

export const PersonalSettingsScreen = () => {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AccountDetailsCard />
        <SettingsCard />
        <DangerZoneCard />
      </ScrollView>
    </Screen>
  );
};
