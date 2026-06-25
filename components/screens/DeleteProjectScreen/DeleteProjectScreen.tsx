import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteProjectMutation } from "@/api";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";
import { DeleteProjectScreenProps } from "./types";

export const DeleteProjectScreen = ({
  projectId,
  onClose,
}: DeleteProjectScreenProps) => {
  const { t } = useTranslation("projects");
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
      title={t("deleteProject.title")}
      message={t("deleteProject.message")}
      confirmLabel={t("deleteProject.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
