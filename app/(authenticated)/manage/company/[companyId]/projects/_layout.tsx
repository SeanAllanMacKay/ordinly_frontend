import React from "react";
import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="[projectId]" options={{ headerShown: false }} />
    </Stack>
  );
}
