import React from "react";
import { View } from "react-native";

import { Stack } from "expo-router";
import { DrawerHost, ModalHost } from "@/components/screens";

// Auth enforcement lives in the root layout's `Stack.Protected` guard — this
// group only renders when the user is authenticated, so no redirect logic here.
export default function AuthenticatedLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="manage" options={{ headerShown: false }} />
      </Stack>

      {/* Renders drawer modals (driven by the `?drawer=` param) in place over
          whatever authenticated screen is active. */}
      <DrawerHost />

      {/* Renders confirmation modals (driven by the `?modal=` param) in place
          over whatever authenticated screen is active. */}
      <ModalHost />
    </View>
  );
}
