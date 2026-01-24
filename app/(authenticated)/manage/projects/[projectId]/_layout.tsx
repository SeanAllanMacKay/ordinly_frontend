import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { Button } from "@/components";
import { routes } from "@/constants/routes";
import { useGetPersonalProjectQuery } from "@/api-abstraction/queries";
import { Menu, Text } from "react-native-paper";
import { useWindowDimensions, View } from "react-native";
import { DESKTOP_WIDTH } from "@/constants/breakpoints";
import Animated from "react-native-reanimated";

export default function ProjectIdRouter() {
  const { width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="edit-project"
        options={{
          title: "Edit project",
          presentation: isDesktop ? "transparentModal" : "modal",
          headerShown: !isDesktop,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
