import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, Typography } from "@/components";
import { emptyStateStyles } from "./styles";
import { EmptyStateProps } from "./types";

export const EmptyState = ({
  icon,
  title,
  subtitle,
  actions,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View style={[emptyStateStyles.container]}>
      <View
        style={[
          emptyStateStyles.iconContainer,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <Icon name={icon} size="xxl" color="onPrimaryContainer" />
      </View>

      <View style={[emptyStateStyles.textContainer]}>
        <Typography size="lg" emphasis="high" color="onBackground">
          {title}
        </Typography>

        {subtitle ? (
          <Typography size="md" emphasis="medium" color="onSurfaceVariant">
            {subtitle}
          </Typography>
        ) : null}
      </View>

      {actions?.length ? (
        <View style={[emptyStateStyles.actionsContainer]}>
          {actions.map((action, index) => (
            <React.Fragment key={index}>{action}</React.Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
};
