import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion, Drawer } from "@/components";
import {
  EditProjectAssigneesInputs,
  EditProjectForm,
  EditProjectProvider,
  EditProjectSubmissionButton,
} from "@/components/organisms/Forms/EditProjectForm";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { EditProjectScreenProps } from "./types";

export const EditProjectScreen = ({
  projectId,
  onClose,
}: EditProjectScreenProps) => {
  const { t } = useTranslation("projects");
  const { isPersonal } = useCurrentCompany();

  return (
    <EditProjectProvider projectId={projectId}>
      <Drawer
        title={t("editProject.title")}
        actions={[
          <EditProjectSubmissionButton
            key="submit"
            projectId={projectId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <EditProjectForm projectId={projectId} />

        {!isPersonal && (
          <Accordion>
            <Accordion.Item id="assignees" label={t("accordion.assignees")}>
              <EditProjectAssigneesInputs />
            </Accordion.Item>
          </Accordion>
        )}
      </Drawer>
    </EditProjectProvider>
  );
};
