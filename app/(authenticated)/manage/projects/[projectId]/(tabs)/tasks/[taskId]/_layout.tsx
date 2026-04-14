import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  anchor: "index",
};

export default function TaskIdRouter() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Task details",
          presentation: "transparentModal",
          animation: "none",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="edit-task"
        options={{
          title: "Task details",
          presentation: "transparentModal",
          animation: "none",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
