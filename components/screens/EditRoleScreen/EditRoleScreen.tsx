import React from "react";
import { useTranslation } from "react-i18next";
import { AddRoleForm, Button, Drawer } from "@/components";
import {
  EditRoleProvider,
  EditRoleSubmissionButton,
} from "@/components/organisms/Forms/EditRoleForm";
import { useModals } from "@/util/navigation/useModals";
import { EditRoleScreenProps } from "./types";

export const EditRoleScreen = ({ roleId, onClose }: EditRoleScreenProps) => {
  const { t } = useTranslation("companies");
  const { open: openModal } = useModals();

  return (
    <EditRoleProvider roleId={roleId}>
      <Drawer
        title={t("editRole.title")}
        actions={[
          <Button
            key="delete"
            variant="danger"
            mode="outlined"
            icon="remove"
            permission="roles:delete"
            label={t("deleteRole.trigger")}
            onPress={() => openModal("confirm-delete-role", { roleId })}
          />,
          <EditRoleSubmissionButton
            key="submit"
            roleId={roleId}
            onSuccess={onClose}
          />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddRoleForm />
      </Drawer>
    </EditRoleProvider>
  );
};
