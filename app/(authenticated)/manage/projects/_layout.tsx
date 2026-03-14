import React from "react";
import { useGetProjectQuery } from "@/api";
import { ScreenHeader } from "@/components";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Projects" }} />

      <Stack.Screen
        name="add-project"
        options={{
          headerTitle: "Add project",
          presentation: "transparentModal",
          animation: "none",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[projectId]"
        options={({ route: { params } }) => ({
          header: () => {
            const { data: { project } = {} } = useGetProjectQuery({
              projectId: params?.projectId,
            });

            return <ScreenHeader title={project?.name} withBackButton />;
          },
        })}
      />
    </Stack>
  );
}
