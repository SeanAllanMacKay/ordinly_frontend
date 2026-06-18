import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Typography } from "../Typography";
import { cardStyles } from "./styles";
import { CardRenderProps } from "./types";

export const CardRender = ({
  title,
  subtitle,
  children,
  headerLeft,
  headerRight,
  actions,
  emphasis,
}: CardRenderProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        cardStyles.container,
        {
          backgroundColor:
            emphasis === "high"
              ? theme.colors.primaryContainer
              : theme.colors.surfaceVariant,
        },
      ]}
    >
      <View>
        {title || subtitle ? (
          <View style={cardStyles.headerContainer}>
            {headerLeft}

            <View style={cardStyles.headerContentContainer}>
              {title ? (
                <Typography
                  size="lg"
                  color={
                    emphasis === "high"
                      ? "onPrimaryContainer"
                      : "onSurfaceVariant"
                  }
                  emphasis="high"
                >
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography
                  color={
                    emphasis === "high"
                      ? "onPrimaryContainer"
                      : "onSurfaceVariant"
                  }
                  size="sm"
                  emphasis="low"
                >
                  {subtitle}
                </Typography>
              ) : null}
            </View>

            {headerRight}
          </View>
        ) : null}

        <View style={cardStyles.contentContainer}>{children}</View>
      </View>

      {actions?.length ? (
        <View style={cardStyles.actionsContainer}>{actions}</View>
      ) : null}
    </View>
  );
};
