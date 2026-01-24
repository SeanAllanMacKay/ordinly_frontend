import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import { Stack } from "expo-router";
import { AppHeader } from "@/components";
import { useGetCurrentUserQuery } from "@/api";

export default function RootLayout() {
  const userQuery = useGetCurrentUserQuery();

  const router = useRouter();

  useEffect(() => {
    if (!userQuery?.data && !userQuery?.isLoading) {
      router.replace("/(unauthenticated)");
    }
  }, [userQuery]);

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="manage" options={{ header: () => <AppHeader /> }} />
    </Stack>
  );
}
