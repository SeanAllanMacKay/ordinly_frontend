import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, Typography } from "@/components";
import { emptyStateStyles } from "./styles";
import { EmptyStateProps } from "./types";

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
        <Icon name={entity} size="xxl" color="onPrimaryContainer" />
      </View>

      <Typography size="lg" emphasis="high" color="onBackground">
        No {entity} to show
      </Typography>
    </View>
  );
};
