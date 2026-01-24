import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Icon } from "@/components";
import { Spacing } from "@/constants/Spacing";

export type EmptyStateProps = {
  variant: "projects" | "tasks" | "companies";
};

export const EmptyState = ({ variant }: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        gap: Spacing.m,
      }}
    >
      <View
        style={{
          borderRadius: 100,
          width: 100,
          height: 100,
          backgroundColor: "lightgrey",
          padding: Spacing.m,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name={variant} size="md" color={"grey"} />
      </View>

      <Text style={{ fontSize: Spacing.m }}>No {variant} to show</Text>
    </View>
  );
};
