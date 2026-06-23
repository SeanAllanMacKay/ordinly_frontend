import React from "react";
import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";

export default function Companies() {
  const { width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
