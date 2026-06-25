import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddProjectForm,
  AddProjectProvider,
  AddProjectSubmissionButton,
  Drawer,
} from "@/components";
import { AddProjectScreenProps } from "./types";

export const AddProjectScreen = ({ onClose }: AddProjectScreenProps) => {
  const { t } = useTranslation("projects");

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
      </Drawer>
    </AddProjectProvider>
  );
};
