import React from "react";
import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";

export default function TabLayout() {
  const { width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerLeft: () => <></> }} />

      <Stack.Screen
        name="add-project"
        options={{
          title: "Add project",
          presentation: isDesktop ? "transparentModal" : "modal",
          headerShown: !isDesktop,
          animation: "fade",
        }}
      />

      <Stack.Screen name="[projectId]" options={{ headerShown: false }} />
    </Stack>
  );
}
