import React from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteRoleMutation } from "@/api";
import { useDrawers } from "@/util/navigation/useDrawers";
import { DeleteRoleScreenProps } from "./types";

export const DeleteRoleScreen = ({
  roleId,
  onClose,
}: DeleteRoleScreenProps) => {
  const { t } = useTranslation("companies");
  const { close: closeDrawer } = useDrawers();

  const { mutate, isPending } = useDeleteRoleMutation({
    roleId,
    onSuccess: () => {
      onClose();
      closeDrawer();
    },
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteRole.title")}
      message={t("deleteRole.message")}
      confirmLabel={t("deleteRole.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
