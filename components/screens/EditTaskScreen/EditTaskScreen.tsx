import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion, Drawer } from "@/components";
import {
  EditProjectTaskAssigneesInputs,
  EditProjectTaskDetailsInputs,
  EditProjectTaskLinksInputs,
  EditProjectTaskProvider,
  EditProjectTaskSubmissionButton,
} from "@/components/organisms/Forms/EditProjectTaskForm";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { EditTaskScreenProps } from "./types";

export const EditTaskScreen = ({
  projectId,
  taskId,
  onClose,
}: EditTaskScreenProps) => {
  const { t } = useTranslation("tasks");
  const { isPersonal } = useCurrentCompany();

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

        {!isPersonal && (
          <Accordion>
            <Accordion.Item id="assignees" label={t("accordion.assignees")}>
              <EditProjectTaskAssigneesInputs />
            </Accordion.Item>
          </Accordion>
        )}
      </Drawer>
    </EditProjectTaskProvider>
  );
};
