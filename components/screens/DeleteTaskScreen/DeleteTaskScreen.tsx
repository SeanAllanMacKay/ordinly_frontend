import React from "react";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteProjectTaskMutation } from "@/api";
import { DeleteTaskScreenProps } from "./types";

export const DeleteTaskScreen = ({
  projectId,
  taskId,
  onClose,
}: DeleteTaskScreenProps) => {
  const { mutate, isPending } = useDeleteProjectTaskMutation({
    projectId,
    taskId,
    onSuccess: onClose,
  });

  return (
    <ConfirmDeleteModal
      title="Delete task?"
      message="This will permanently delete this item and everything within it. This action cannot be undone."
      confirmLabel="Delete"
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
