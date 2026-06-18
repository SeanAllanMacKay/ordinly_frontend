import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { EditTaskScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const EditProjectTask = () => {
  const router = useRouter();
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.projects.tasks.root(projectId));
    }
  };

  return (
    <EditTaskScreen projectId={projectId} taskId={taskId} onClose={onClose} />
  );
};

export default EditProjectTask;
