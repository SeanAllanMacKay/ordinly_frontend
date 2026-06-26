import React from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useRemoveWorkerMutation } from "@/api";
import { useDrawers } from "@/util/navigation/useDrawers";
import { DeleteWorkerScreenProps } from "./types";

export const DeleteWorkerScreen = ({
  workerId,
  onClose,
}: DeleteWorkerScreenProps) => {
  const { t } = useTranslation("companies");
  const { close: closeDrawer } = useDrawers();

  const { mutate, isPending } = useRemoveWorkerMutation({
    userId: workerId,
    onSuccess: () => {
      onClose();
      closeDrawer();
    },
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteWorker.title")}
      message={t("deleteWorker.message")}
      confirmLabel={t("deleteWorker.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
