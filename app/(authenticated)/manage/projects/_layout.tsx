import React from "react";
import { useGetProjectQuery } from "@/api";
import { Button, ScreenHeader } from "@/components";
import { Stack } from "expo-router";
import { format } from "date-fns";
import { routes } from "@/constants/routes";

const ProjectHeader = ({ projectId }) => {
  const { data: { project } = {} } = useGetProjectQuery({
    projectId: projectId,
  });

  return (
    <ScreenHeader
      title={project?.name}
      subtitle={`${
        project?.startDate
          ? format(new Date(project?.startDate), "dd MMM yyyy")
          : ""
      }${project?.startDate && project?.dueDate ? " - " : ""}${
        project?.dueDate
          ? format(new Date(project?.dueDate), "dd MMM yyyy")
          : ""
      }`}
      withBackButton
      actions={[
        <Button
          icon="edit"
          href={routes.manage.projects.editProject(projectId)}
        />,
      ]}
    />
  );
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
        })}
      />
    </Stack>
  );
}
