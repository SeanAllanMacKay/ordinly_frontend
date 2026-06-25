import React from "react";
import { Drawer, TopTabNavigation } from "@/components";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useGetProjectTaskQuery } from "@/api";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";

export default function ProjectTaskIdRouter() {
  const router = useRouter();
  const projectRoutes = useProjectRoutes();
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  const taskQuery = useGetProjectTaskQuery({
    projectId: projectId,
    taskId: taskId,
  });

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(projectRoutes.tasks.root(projectId));
    }
  };

  return (
    <Drawer
      title={taskQuery?.data?.task?.name}
      isVisible={true}
      onClose={onClose}
    >
      <TopTabNavigation>
        <TopTabNavigation.Screen
          name="checklist"
          options={{ title: "tabs.checklist" }}
        />

        <TopTabNavigation.Screen
          name="documents"
          options={{ title: "tabs.documents" }}
        />
      </TopTabNavigation>
    </Drawer>
  );
}
