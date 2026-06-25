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
          title: "headers.taskDetails",
          presentation: "transparentModal",
          animation: "none",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="edit-task"
        options={{
          title: "headers.taskDetails",
          presentation: "transparentModal",
          animation: "none",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
