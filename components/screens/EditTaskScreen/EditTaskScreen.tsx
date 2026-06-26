import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "@/components";
import {
  EditProjectTaskDetailsInputs,
  EditProjectTaskLinksInputs,
  EditProjectTaskProvider,
  EditProjectTaskSubmissionButton,
} from "@/components/organisms/Forms/EditProjectTaskForm";
import { EditTaskScreenProps } from "./types";

export const EditTaskScreen = ({
  projectId,
  taskId,
  onClose,
}: EditTaskScreenProps) => {
  const { t } = useTranslation("tasks");

  return (
    <EditProjectTaskProvider projectId={projectId} taskId={taskId}>
      <Drawer
        title={t("editTask.title")}
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

        <EditProjectTaskLinksInputs projectId={projectId} />
      </Drawer>
    </EditProjectTaskProvider>
  );
};
