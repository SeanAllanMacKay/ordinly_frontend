import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { AddTaskScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const AddProjectTask = () => {
  const router = useRouter();
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.projects.tasks.root(projectId));
    }
  };

  return <AddTaskScreen projectId={projectId} onClose={onClose} />;
};

export default AddProjectTask;
