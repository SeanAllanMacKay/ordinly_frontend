import React from "react";
import { useRouter } from "expo-router";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteProjectMutation } from "@/api";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";
import { DeleteProjectScreenProps } from "./types";

export const DeleteProjectScreen = ({
  projectId,
  onClose,
}: DeleteProjectScreenProps) => {
  const router = useRouter();
  const projectRoutes = useProjectRoutes();

  const { mutate, isPending } = useDeleteProjectMutation({
    projectId,
    onSuccess: () => {
      onClose();
      router.replace(projectRoutes.root());
    },
  });

  return (
    <ConfirmDeleteModal
      title="Delete project?"
      message="This will permanently delete the project and all of its tasks, milestones, and phases. This action cannot be undone."
      confirmLabel="Delete project"
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
