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
      router.replace(routes.manage.projects.tasks.root(projectId));
    }
  };

  return (
    <Drawer
      title={
        <ScreenHeader
          title={taskQuery?.data?.task?.name}
          subtitle={`${
            taskQuery?.data?.task?.startDate
              ? format(
                  new Date(taskQuery?.data?.task?.startDate),
                  "dd MMM yyyy",
                )
              : ""
          }${taskQuery?.data?.task?.startDate && taskQuery?.data?.task?.dueDate ? " - " : ""}${
            taskQuery?.data?.task?.dueDate
              ? format(new Date(taskQuery?.data?.task?.dueDate), "dd MMM yyyy")
              : ""
          }`}
        />
      }
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
