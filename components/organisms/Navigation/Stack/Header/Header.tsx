import React from "react";
import { Navigator, Stack as ERStack, useRouter } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";

export const Header = ({ screenOptions }) => {
  const { t } = useTranslation("navigation");

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

      <Animated.Text>
        {t(screenOptions.headerTitle, { defaultValue: screenOptions.headerTitle })}
      </Animated.Text>
    </Animated.View>
  );
};
