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
