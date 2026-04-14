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
}: CardRenderProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        cardStyles.container,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <View>
        {title || subtitle ? (
          <View style={cardStyles.headerContainer}>
            {headerLeft}

            <View>
              {title ? (
                <Typography size="lg" color="onSurfaceVariant" emphasis="high">
                  {title}
                </Typography>
              ) : null}
              {subtitle ? (
                <Typography color="onSurfaceVariant" size="sm" emphasis="low">
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
