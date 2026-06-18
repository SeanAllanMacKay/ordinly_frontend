import React from "react";
import {
  Accordion,
  AddProjectPhaseDetailsInputs,
  AddProjectPhaseDocumentsInputs,
  AddProjectPhaseProvider,
  AddProjectPhaseSubmissionButton,
  Drawer,
} from "@/components";
import { AddPhaseScreenProps } from "./types";

export const AddPhaseScreen = ({ projectId, onClose }: AddPhaseScreenProps) => {
  return (
    <AddProjectPhaseProvider>
      <Drawer
        title="Add phase"
        actions={[
          <AddProjectPhaseSubmissionButton
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
            <AddProjectPhaseDetailsInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label="Documents">
            <AddProjectPhaseDocumentsInputs />
          </Accordion.Item>
          <Accordion.Item id="links" label="Links"></Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectPhaseProvider>
  );
};
