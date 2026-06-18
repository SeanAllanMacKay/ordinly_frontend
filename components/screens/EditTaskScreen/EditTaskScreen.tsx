import React from "react";
import { Drawer } from "@/components";
import {
  EditProjectTaskDetailsInputs,
  EditProjectTaskProvider,
  EditProjectTaskSubmissionButton,
} from "@/components/organisms/Forms/EditProjectTaskForm";
import { EditTaskScreenProps } from "./types";

export const EditTaskScreen = ({
  projectId,
  taskId,
  onClose,
}: EditTaskScreenProps) => {
  return (
    <EditProjectTaskProvider projectId={projectId} taskId={taskId}>
      <Drawer
        title="Edit task"
        actions={[
          <EditProjectTaskSubmissionButton
            key="submit"
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
    </EditProjectTaskProvider>
  );
};
