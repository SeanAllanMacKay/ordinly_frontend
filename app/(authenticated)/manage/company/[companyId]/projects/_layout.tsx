import React from "react";
import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <ScreenHeader title="Projects" /> }}
      />

      <Stack.Screen name="[projectId]" options={{ headerShown: false }} />
    </Stack>
  );
}
