import React from "react";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerLeft: () => <></> }} />

      <Stack.Screen name="[projectId]" options={{ headerShown: false }} />
    </Stack>
  );
}
