import React from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteClientContactMutation } from "@/api";
import { useDrawers } from "@/util/navigation/useDrawers";
import { DeleteContactScreenProps } from "./types";

export const DeleteContactScreen = ({
  clientId,
  contactId,
  onClose,
}: DeleteContactScreenProps) => {
  const { t } = useTranslation("clients");
  const { close: closeDrawer } = useDrawers();

  const { mutate, isPending } = useDeleteClientContactMutation({
    clientId,
    contactId,
    onSuccess: () => {
      onClose();
      // Also close the edit drawer this confirmation was opened from.
      closeDrawer();
    },
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteContact.title")}
      message={t("deleteContact.message")}
      confirmLabel={t("deleteContact.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
