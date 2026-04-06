import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { skeletonStyles } from "./styles";

const DURATION = 1000;

export const Skeleton = ({
  isRound,
  width,
  height,
  delay = 0,
}: {
  isRound?: boolean;
  width?: number;
  height: number;
  delay?: number;
}) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);

  const [layoutWidth, setLayoutWidth] = useState(width ?? 0);

  const handleLayout = (event: LayoutChangeEvent) => {
    if (!width) {
      setLayoutWidth(event.nativeEvent.layout.width);
    }
  };

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const shimmerWidth = useMemo(() => layoutWidth * 0.3, [layoutWidth]);

  useEffect(() => {
    if (layoutWidth > 0) {
      translateX.value = 0;

      translateX.value = withDelay(
        delay,
        withRepeat(
          withTiming(layoutWidth - shimmerWidth, { duration: DURATION }),
          -1,
          true,
        ),
      );
    }
  }, [layoutWidth, delay, shimmerWidth]);

  const gradientArray: ComponentProps<typeof LinearGradient>["colors"] =
    theme.dark
      ? [
          `${theme.colors.outlineVariant}00`,
          `${theme.colors.outlineVariant}25`,
          `${theme.colors.outlineVariant}50`,
          `${theme.colors.outlineVariant}25`,
          `${theme.colors.outlineVariant}00`,
        ]
      : [
          `${theme.colors.inverseOnSurface}00`,
          `${theme.colors.inverseOnSurface}25`,
          `${theme.colors.inverseOnSurface}50`,
          `${theme.colors.inverseOnSurface}25`,
          `${theme.colors.inverseOnSurface}00`,
        ];

  return (
    <View
      style={[
        skeletonStyles.skeleton,
        { backgroundColor: theme.colors.surfaceVariant },
        isRound ? skeletonStyles.round : skeletonStyles.rectangle,
        { width: width ?? "100%", height },
      ]}
      onLayout={handleLayout}
    >
      <Animated.View style={[animatedDefault]}>
        <LinearGradient
          // Button Linear Gradient
          colors={gradientArray}
          style={{
            height,
            width: shimmerWidth,
            alignItems: "center",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};
