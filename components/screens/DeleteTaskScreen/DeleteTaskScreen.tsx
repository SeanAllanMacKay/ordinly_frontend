import React from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteProjectTaskMutation } from "@/api";
import { DeleteTaskScreenProps } from "./types";

export const DeleteTaskScreen = ({
  projectId,
  taskId,
  onClose,
}: DeleteTaskScreenProps) => {
  const { t } = useTranslation("tasks");
  const { mutate, isPending } = useDeleteProjectTaskMutation({
    projectId,
    taskId,
    onSuccess: onClose,
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteTask.title")}
      message={t("deleteTask.message")}
      confirmLabel={t("delete")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
