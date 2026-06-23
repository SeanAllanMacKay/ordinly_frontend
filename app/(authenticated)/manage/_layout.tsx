import React from "react";
import { Stack } from "expo-router";

export default function ManageLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal" />
      <Stack.Screen name="company" />
    </Stack>
  );
}
