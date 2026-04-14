import React from "react";

import { Stack } from "expo-router";

export const unstable_settings = {
  anchor: "index",
};

export default function ProjectIdRouter() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen
        name="[taskId]"
        options={{
          title: "Add task",
          presentation: "transparentModal",
          animation: "none",
        }}
      />

      <Stack.Screen
        name="add-task"
        options={{
          title: "Add task",
          presentation: "transparentModal",
          animation: "none",
        }}
      />
    </Stack>
  );
}
