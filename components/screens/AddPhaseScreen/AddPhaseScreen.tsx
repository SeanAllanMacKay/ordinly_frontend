import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AddProjectPhaseDetailsInputs,
  AddProjectPhaseDocumentsInputs,
  AddProjectPhaseLinksInputs,
  AddProjectPhaseProvider,
  AddProjectPhaseSubmissionButton,
  Drawer,
} from "@/components";
import { AddPhaseScreenProps } from "./types";

export const AddPhaseScreen = ({ projectId, onClose }: AddPhaseScreenProps) => {
  const { t } = useTranslation("tasks");

  return (
    <AddProjectPhaseProvider>
      <Drawer
        title={t("phase.title")}
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
          <Accordion.Item id="details" label={t("accordion.details")}>
            <AddProjectPhaseDetailsInputs />
          </Accordion.Item>

          <Accordion.Item id="documents" label={t("accordion.documents")}>
            <AddProjectPhaseDocumentsInputs />
          </Accordion.Item>
          <Accordion.Item id="links" label={t("accordion.links")}>
            <AddProjectPhaseLinksInputs projectId={projectId} />
          </Accordion.Item>
        </Accordion>
      </Drawer>
    </AddProjectPhaseProvider>
  );
};
