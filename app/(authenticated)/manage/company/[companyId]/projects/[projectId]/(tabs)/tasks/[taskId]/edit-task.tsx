import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { EditTaskScreen } from "@/components/screens";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";

const EditProjectTask = () => {
  const router = useRouter();
  const projectRoutes = useProjectRoutes();
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(projectRoutes.tasks.root(projectId));
    }
  };

  return (
    <EditTaskScreen projectId={projectId} taskId={taskId} onClose={onClose} />
  );
};

export default EditProjectTask;
