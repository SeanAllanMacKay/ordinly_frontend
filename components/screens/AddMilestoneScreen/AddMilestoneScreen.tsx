import React from "react";
import {
  Accordion,
  AddProjectMilestoneDetailsInputs,
  AddProjectMilestoneDocumentsInputs,
  AddProjectMilestoneProvider,
  AddProjectMilestoneSubmissionButton,
  Drawer,
} from "@/components";
import { AddMilestoneScreenProps } from "./types";

export const AddMilestoneScreen = ({
  projectId,
  onClose,
}: AddMilestoneScreenProps) => {
  return (
    <AddProjectMilestoneProvider>
      <Drawer
        title="Add milestone"
        actions={[
          <AddProjectMilestoneSubmissionButton
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
            <AddProjectMilestoneDetailsInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label="Documents">
            <AddProjectMilestoneDocumentsInputs />
          </Accordion.Item>

          <Accordion.Item id="links" label="Links"></Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectMilestoneProvider>
  );
};
