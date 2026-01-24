import React from "react";

import { Stack } from "expo-router";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";
import { useWindowDimensions } from "react-native";

export default function ProjectIdRouter() {
  const { width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="add-task"
        options={{
          title: "Add task",
          presentation: "modal",
          headerShown: !isDesktop,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
