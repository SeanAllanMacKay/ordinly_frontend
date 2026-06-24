import React from "react";
import { View } from "react-native";
import { Button, Screen, Typography } from "@/components";
import { useModals } from "@/util/navigation/useModals";
import { Spacing } from "@/styles";

export const CompanySettingsScreen = () => {
  const { open } = useModals();

  return (
    <Screen>
      <View style={{ padding: Spacing.md, gap: Spacing.md }}>
        <Typography emphasis="high">Danger zone</Typography>
        <Typography>
          Deleting this company permanently removes all of its projects, teams,
          and members. This action cannot be undone.
        </Typography>
        <View style={{ flexDirection: "row" }}>
          <Button
            variant="danger"
            mode="contained"
            icon="remove"
            label="Delete company"
            onPress={() => open("confirm-delete-company")}
          />
        </View>
      </View>
    </Screen>
  );
};
