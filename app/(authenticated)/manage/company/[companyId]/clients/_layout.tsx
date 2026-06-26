import React from "react";
import { useGetClientQuery } from "@/api";
import { ScreenHeader } from "@/components";
import { Stack } from "expo-router";

const ClientHeader = ({ clientId }: { clientId?: string }) => {
  const { data: { client } = {} } = useGetClientQuery({
    clientId: clientId!,
  });

  return <ScreenHeader title={client?.name} withBackButton />;
};

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <ScreenHeader title="tabs.clients" /> }}
      />

      <Stack.Screen
        name="[clientId]"
        options={({ route: { params } }) => ({
          header: () => (
            <ClientHeader
              clientId={(params as { clientId?: string })?.clientId}
            />
          ),
          animation: "slide_from_right",
        })}
      />
    </Stack>
  );
}
