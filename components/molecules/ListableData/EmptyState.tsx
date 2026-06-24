import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, Typography } from "@/components";
import { IconNameType } from "@/components/atoms/Icon/types";
import { emptyStateStyles } from "./styles";
import { EmptyStateProps } from "./types";

// Not every entity name is itself a valid icon name, so map to a sensible icon.
const entityIcons: Record<EmptyStateProps["entity"], IconNameType> = {
  projects: "projects",
  tasks: "tasks",
  companies: "companies",
  roles: "identification-card",
  teams: "crew",
  workers: "account",
  clients: "blueprint",
  contacts: "identification-card",
};

export const EmptyState = ({ entity }: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View style={[emptyStateStyles.container]}>
      <View
        style={[
          emptyStateStyles.iconContainer,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <Icon name={entityIcons[entity]} size="xxl" color="onPrimaryContainer" />
      </View>

      <Typography size="lg" emphasis="high" color="onBackground">
        No {entity} to show
      </Typography>
    </View>
  );
};
