import React from "react";
import { useGetProjectQuery } from "@/api";
import { ScreenHeader } from "@/components";
import { Stack } from "expo-router";

const ProjectHeader = ({ projectId }: { projectId?: string }) => {
  const { data: { project } = {} } = useGetProjectQuery({
    projectId: projectId!,
  });

  return <ScreenHeader title={project?.name} withBackButton />;
};

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="[projectId]"
        options={({ route: { params } }) => ({
          header: () => (
            <ProjectHeader
              projectId={(params as { projectId?: string })?.projectId}
            />
          ),
          presentation: "transparentModal",
          animation: "slide_from_right",
        })}
      />
    </Stack>
  );
}
