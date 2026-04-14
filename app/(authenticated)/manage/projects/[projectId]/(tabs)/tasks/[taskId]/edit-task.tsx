import React from "react";
import { Drawer } from "@/components";
import { useGlobalSearchParams, useRouter } from "expo-router";
import {
  EditProjectTaskDetailsInputs,
  EditProjectTaskProvider,
  EditProjectTaskSubmissionButton,
} from "@/components/organisms/Forms/EditProjectTaskForm";
import { routes } from "@/constants/routes";

const EditProjectTaskContent = () => {
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
    <Drawer
      title="Edit task"
      actions={[
        <EditProjectTaskSubmissionButton
          taskId={taskId}
          projectId={projectId}
          onSuccess={onClose}
        />,
      ]}
      isVisible={true}
      onClose={onClose}
    >
      <EditProjectTaskDetailsInputs />
    </Drawer>
  );
};

export default function EditProjectTask() {
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  return (
    <EditProjectTaskProvider projectId={projectId} taskId={taskId}>
      <EditProjectTaskContent />
    </EditProjectTaskProvider>
  );
}
