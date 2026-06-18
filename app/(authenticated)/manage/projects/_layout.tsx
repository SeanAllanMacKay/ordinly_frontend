import React from "react";
import { useGetProjectQuery } from "@/api";
import { ScreenHeader } from "@/components";
import { Stack } from "expo-router";

const ProjectHeader = ({ projectId }) => {
  const { data: { project } = {} } = useGetProjectQuery({
    projectId: projectId,
  });

  return <ScreenHeader title={project?.name} withBackButton />;
};

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

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
          header: () => <ProjectHeader projectId={params?.projectId} />,
          presentation: "transparentModal",
          animation: "slide_from_right",
        })}
      />
    </Stack>
  );
}
