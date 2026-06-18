import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "@/styles/PaperProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGetCurrentUserQuery } from "@/api";
import { SplashScreen } from "@/components/screens";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <PaperProvider>
            <RootNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

/**
 * Single source of truth for auth-gated routing. Until the current-user query
 * resolves we render a splash, so protected screens never mount (and never fire
 * their own queries) before the auth decision is made. `Stack.Protected`
 * guards then enforce which route group is reachable — no imperative
 * `router.replace` effects, no racing redirects.
 */
function RootNavigator() {
  const userQuery = useGetCurrentUserQuery();

  if (userQuery.isLoading) {
    return <SplashScreen />;
  }

  const isAuthenticated = !!userQuery.data;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(authenticated)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(unauthenticated)" />
      </Stack.Protected>

      {/* Reachable in either auth state: a signed-in (but unverified) user
          clicking the email link is authenticated, yet logged-out users must
          still be able to verify too. */}
      <Stack.Screen name="verify-account" />
    </Stack>
  );
}
