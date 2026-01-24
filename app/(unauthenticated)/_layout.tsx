import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useGetCurrentUserQuery } from "@/api";
import { AppHeader } from "@/components";

export default function UnauthenticatedLayout() {
  const userQuery = useGetCurrentUserQuery();

  const router = useRouter();

  useEffect(() => {
    if (userQuery?.data && !userQuery?.isLoading) {
      router.replace("/(authenticated)");
    }
  }, [userQuery]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <AppHeader /> }} />
      <Stack.Screen name="login" options={{ header: () => <AppHeader /> }} />
    </Stack>
  );
}
