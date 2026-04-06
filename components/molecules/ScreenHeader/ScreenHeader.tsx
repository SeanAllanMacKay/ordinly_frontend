import { useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button, Typography } from "@/components";
import { screenHeaderStyle } from "./styles";
import { useTheme } from "react-native-paper";

export const ScreenHeader = ({
  title,
  subtitle,
  withBackButton = false,
  actions,
}: {
  title?: string;
  subtitle?: string;
  withBackButton?: boolean;
  actions?: React.ReactElement[];
}) => {
  const router = useRouter();
  const theme = useTheme();

  const hasBackButton =
    withBackButton && router.canGoBack() && Platform.OS !== "web";

  return (
    <View
      style={[
        screenHeaderStyle.container,
        !hasBackButton && screenHeaderStyle.withoutBackButton,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={screenHeaderStyle.left}>
        {hasBackButton ? (
          <Animated.View entering={FadeIn}>
            <Button href="../" icon="chevron-left" />
          </Animated.View>
        ) : null}

        <View>
          <Typography size="lg">{title}</Typography>
          <Typography size="sm" color="onSurface">
            {subtitle}
          </Typography>
        </View>
      </View>

      <View>{actions}</View>
    </View>
  );
};
