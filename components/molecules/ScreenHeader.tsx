import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button, Text } from "@/components";

export const ScreenHeader = ({
  title,
  sharedTransitionTag,
  withBackButton = false,
}: {
  title?: string;
  sharedTransitionTag?: string;
  withBackButton?: boolean;
}) => {
  const router = useRouter();

  return (
    <View style={{ position: "relative" }}>
      <Animated.View
        style={{
          backgroundColor: "white",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        sharedTransitionTag={sharedTransitionTag}
      ></Animated.View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {withBackButton && router.canGoBack() ? (
          <Animated.View entering={FadeIn}>
            <Button href="../" icon="chevron-left" />
          </Animated.View>
        ) : null}

        <Text size="l">{title}</Text>
      </View>
    </View>
  );
};
