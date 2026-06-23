import React from "react";
import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";
import { ScreenHeader } from "@/components";

export default function TabLayout() {
  const { width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <ScreenHeader title="Settings" /> }}
      />
    </Stack>
  );
}
