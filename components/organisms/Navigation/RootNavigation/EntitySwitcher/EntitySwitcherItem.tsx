import React from "react";
import { View } from "react-native";
import { EntitySwitcherAvatar } from "./EntitySwitcherAvatar";
import { Spacing } from "@/styles";
import { Icon, Typography } from "@/components/atoms";

export const EntitySwitcherItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: Spacing.sm,
        alignItems: "center",
      }}
    >
      <EntitySwitcherAvatar name={name} />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: Spacing.xs,
        }}
      >
        <Typography>{name}</Typography>

        <Typography size="xs">{description}</Typography>
      </View>
    </View>
  );
};
