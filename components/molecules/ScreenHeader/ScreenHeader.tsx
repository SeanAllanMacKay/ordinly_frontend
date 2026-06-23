import { useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button, Typography } from "@/components";
import { screenHeaderStyle, ENTITY_SWITCHER_RESERVED_WIDTH } from "./styles";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "@/styles";
import { useIsPhone } from "@/styles/hooks/useIsPhone";

export const ScreenHeader = ({
  title,
  subtitle,
  withBackButton = false,
  actions,
}: {
  title?: string | React.ReactElement;
  subtitle?: string | React.ReactElement;
  withBackButton?: boolean;
  actions?: React.ReactElement[];
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const isPhone = useIsPhone();

  const hasBackButton = withBackButton && router.canGoBack();

  const paddingTop = top + Spacing.md;

  // On mobile the EntitySwitcher floats over the top-right of the screen, so
  // reserve room for it to keep the header's content from sliding underneath.
  const paddingRight = isPhone ? ENTITY_SWITCHER_RESERVED_WIDTH : Spacing.md;

  return (
    <View
      style={[
        screenHeaderStyle.container,
        { backgroundColor: theme.colors.background, paddingTop, paddingRight },
      ]}
    >
      <View style={screenHeaderStyle.left}>
        {hasBackButton ? (
          <Animated.View entering={FadeIn}>
            <Button href="../" icon="chevron-left" />
          </Animated.View>
        ) : null}

        <View>
          {typeof title === "string" ? (
            <Typography size="lg">{title}</Typography>
          ) : (
            title
          )}

          {typeof subtitle === "string" ? (
            <Typography size="sm" color="onSurface">
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )}
        </View>
      </View>

      <View>{actions}</View>
    </View>
  );
};
