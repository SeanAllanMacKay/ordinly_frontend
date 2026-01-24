import React from "react";
import { Navigator, Stack as ERStack, useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "@/components/Button";

export const Header = ({ screenOptions }) => {
  return screenOptions?.header ? (
    screenOptions?.header()
  ) : (
    <Animated.View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Animated.View entering={FadeIn}>
        <Button onPress={() => {}} icon="chevron-left" />
      </Animated.View>

      <Animated.Text>{screenOptions.headerTitle}</Animated.Text>
    </Animated.View>
  );
};
