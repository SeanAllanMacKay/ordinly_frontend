import React, { useEffect, useState } from "react";
import { StyleProp, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Text } from "../Text";

const duration = 1000;

export const Skeleton = ({
  isRound,
  width,
  height,
}: {
  isRound?: boolean;
  width: number;
  height: number;
}) => {
  const defaultAnim = useSharedValue<number>(width);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));

  useEffect(() => {
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true,
    );

    return () => {
      cancelAnimation(defaultAnim);
    };
  }, []);

  return (
    <View
      style={[
        styles.skeleton,
        isRound ? styles.round : styles.rectangle,
        { width, height },
      ]}
    >
      <Animated.View style={[animatedDefault]}>
        <LinearGradient
          // Button Linear Gradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.2)",
            "rgba(255,255,255,0.3)",
            "rgba(255,255,255,0.2)",
            "rgba(255,255,255,0)",
          ]}
          style={{ height, width, alignItems: "center" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: { overflow: "hidden", backgroundColor: "#E5E4E2" },
  rectangle: { borderRadius: 10 },
  round: {},
  background: {
    height: "100%",
    width: "100%",
  },
});
