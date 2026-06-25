import React from "react";
import { useTranslation } from "react-i18next";
import {
  AddRoleForm,
  AddRoleProvider,
  AddRoleSubmissionButton,
  Drawer,
} from "@/components";
import { AddRoleScreenProps } from "./types";

export const AddRoleScreen = ({ onClose }: AddRoleScreenProps) => {
  const { t } = useTranslation("companies");

  return (
    <AddRoleProvider>
      <Drawer
        title={t("addRole.title")}
        actions={[<AddRoleSubmissionButton key="submit" onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddRoleForm />
      </Drawer>
    </AddRoleProvider>
  );
};
