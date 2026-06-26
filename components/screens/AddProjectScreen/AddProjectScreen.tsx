import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AddProjectAssigneesInputs,
  AddProjectForm,
  AddProjectProvider,
  AddProjectSubmissionButton,
  Drawer,
} from "@/components";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { AddProjectScreenProps } from "./types";

export const AddProjectScreen = ({ onClose }: AddProjectScreenProps) => {
  const { t } = useTranslation("projects");
  const { isPersonal } = useCurrentCompany();

  return (
    <AddProjectProvider>
      <Drawer
        title={t("addProject.title")}
        actions={[
          <AddProjectSubmissionButton key="submit" onSuccess={onClose} />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddProjectForm />

        {!isPersonal && (
          <Accordion>
            <Accordion.Item id="assignees" label={t("accordion.assignees")}>
              <AddProjectAssigneesInputs />
            </Accordion.Item>
          </Accordion>
        )}
      </Drawer>
    </AddProjectProvider>
  );
};
