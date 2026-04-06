import React from "react";

import { Stack } from "expo-router";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";
import { useWindowDimensions } from "react-native";

export default function ProjectIdRouter() {
  const { width } = useWindowDimensions();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="add-task"
        options={{
          title: "Add task",
          presentation: "transparentModal",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
