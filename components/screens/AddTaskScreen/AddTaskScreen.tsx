import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AddProjectTaskChecklistInputs,
  AddProjectTaskDetailsInputs,
  AddProjectTaskDocumentsInputs,
  AddProjectTaskLinksInputs,
  AddProjectTaskProvider,
  AddProjectTaskSubmissionButton,
  Drawer,
} from "@/components";
import { AddTaskScreenProps } from "./types";

export const AddTaskScreen = ({ projectId, onClose }: AddTaskScreenProps) => {
  const { t } = useTranslation("tasks");

  return (
    <AddProjectTaskProvider>
      <Drawer
        title={t("addTask.title")}
        actions={[
          <AddProjectTaskSubmissionButton
            key="submit"
            projectId={projectId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddProjectTaskDetailsInputs />

        <Accordion>
          <Accordion.Item id="checklist" label={t("accordion.checklist")}>
            <AddProjectTaskChecklistInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label={t("accordion.documents")}>
            <AddProjectTaskDocumentsInputs />
          </Accordion.Item>
          <Accordion.Item id="links" label={t("accordion.links")}>
            <AddProjectTaskLinksInputs projectId={projectId} />
          </Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectTaskProvider>
  );
};
