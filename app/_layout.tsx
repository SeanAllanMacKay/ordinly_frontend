import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "@/styles/PaperProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider>
          <Stack initialRouteName="(unauthenticated)">
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
              name="(unauthenticated)"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(authenticated)"
              options={{ headerShown: false }}
            />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
