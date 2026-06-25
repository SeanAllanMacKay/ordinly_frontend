import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "@/components";
import {
  EditProjectForm,
  EditProjectProvider,
  EditProjectSubmissionButton,
} from "@/components/organisms/Forms/EditProjectForm";
import { EditProjectScreenProps } from "./types";

export const EditProjectScreen = ({
  projectId,
  onClose,
}: EditProjectScreenProps) => {
  const { t } = useTranslation("projects");

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
      </Drawer>
    </EditProjectProvider>
  );
};
