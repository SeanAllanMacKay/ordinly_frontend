import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ProjectTasksDataList, Screen } from "@/components";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";
import { routes } from "@/constants/routes";

export default function TaskDetails() {
  const params = useGlobalSearchParams<{ projectId: string }>();

  return (
    <Screen>
      <ProjectTasksDataList />

      <FloatingActionButton
        icon="plus"
        label="Add task"
        href={routes.manage.projects.tasks.addTask(params?.projectId)}
      />
    </Screen>
  );
}
