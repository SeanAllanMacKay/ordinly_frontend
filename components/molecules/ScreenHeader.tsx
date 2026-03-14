import { useRouter } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {withBackButton && router.canGoBack() && Platform.OS !== "web" ? (
          <Animated.View entering={FadeIn}>
            <Button href="../" icon="chevron-left" />
          </Animated.View>
        ) : null}

        <Text size="l">{title}</Text>
      </View>
    </View>
  );
};
