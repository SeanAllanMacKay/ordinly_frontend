import React from "react";
import { Stack } from "expo-router";
import { AppHeader } from "@/components";

// Auth enforcement lives in the root layout's `Stack.Protected` guard — this
// group only renders when the user is unauthenticated, so no redirect logic here.
export default function UnauthenticatedLayout() {
  return (
    <Stack
      screenOptions={{
        header: AppHeader,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
