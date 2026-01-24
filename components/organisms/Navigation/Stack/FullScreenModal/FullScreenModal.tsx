import { Spacing } from "@/constants/Spacing";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Portal } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../Header";

const MAX_WIDTH = 600;

export const FullScreenModal = ({ children, screenOptions }) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <Portal>
      <Animated.View
        style={{
          height: "100%",
          width: "100%",
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "#00000020",
          }}
          entering={FadeIn}
          exiting={FadeOut}
        />

        <Animated.View
          style={[
            {
              borderRadius: Spacing.s,
              backgroundColor: "#ffffff",
              width: Math.min(MAX_WIDTH, width),
              padding: Spacing.m,
              paddingTop: top,
            },
            Platform.select({ default: { flex: 1 }, web: {} }),
          ]}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <Header screenOptions={screenOptions} />

          {children}
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};
