import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "@/styles/PaperProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <PaperProvider>
            <Stack
              initialRouteName="(unauthenticated)"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="index" />

              <Stack.Screen name="(unauthenticated)" />

              <Stack.Screen name="(authenticated)" />
            </Stack>
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
