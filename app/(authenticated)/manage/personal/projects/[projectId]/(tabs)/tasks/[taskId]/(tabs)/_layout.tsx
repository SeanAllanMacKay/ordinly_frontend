import React from "react";
import { Drawer, ScreenHeader, TopTabNavigation } from "@/components";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useGetProjectTaskQuery } from "@/api";
import { format } from "date-fns";
import { routes } from "@/constants/routes";

export default function ProjectTaskIdRouter() {
  const router = useRouter();
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
      router.replace(routes.manage.personal.projects.tasks.root(projectId));
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
          options={{ title: "Checklist" }}
        />

        <TopTabNavigation.Screen
          name="documents"
          options={{ title: "Documents" }}
        />
      </TopTabNavigation>
    </Drawer>
  );
}
