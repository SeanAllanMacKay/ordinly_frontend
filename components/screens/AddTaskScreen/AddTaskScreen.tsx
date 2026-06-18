import React from "react";
import {
  Accordion,
  AddProjectTaskChecklistInputs,
  AddProjectTaskDetailsInputs,
  AddProjectTaskDocumentsInputs,
  AddProjectTaskProvider,
  AddProjectTaskSubmissionButton,
  Drawer,
} from "@/components";
import { AddTaskScreenProps } from "./types";

export const AddTaskScreen = ({ projectId, onClose }: AddTaskScreenProps) => {
  return (
    <AddProjectTaskProvider>
      <Drawer
        title="Add task"
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
        <Accordion defaultOpenSections={["details"]}>
          <Accordion.Item id="details" label="Details">
            <AddProjectTaskDetailsInputs />
          </Accordion.Item>

          <Accordion.Item id="checklist" label="Checklist">
            <AddProjectTaskChecklistInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label="Documents">
            <AddProjectTaskDocumentsInputs />
          </Accordion.Item>
          <Accordion.Item id="links" label="Links"></Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectTaskProvider>
  );
};
