import React from "react";
import { Stack } from "expo-router";

export default function ProjectIdRouter() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="edit-project"
        options={{
          title: "headers.editProject",
          presentation: "transparentModal",
          headerShown: false,
          animation: "none",
        }}
      />
    </Stack>
  );
}
