import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("tasks");

  return (
    <AddProjectMilestoneProvider>
      <Drawer
        title={t("milestone.title")}
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
          <Accordion.Item id="details" label={t("accordion.details")}>
            <AddProjectMilestoneDetailsInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label={t("accordion.documents")}>
            <AddProjectMilestoneDocumentsInputs />
          </Accordion.Item>

          <Accordion.Item id="links" label={t("accordion.links")}></Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectMilestoneProvider>
  );
};
