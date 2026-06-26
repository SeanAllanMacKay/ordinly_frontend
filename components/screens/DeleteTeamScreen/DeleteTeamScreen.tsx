import React from "react";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteTeamMutation } from "@/api";
import { useDrawers } from "@/util/navigation/useDrawers";
import { DeleteTeamScreenProps } from "./types";

export const DeleteTeamScreen = ({
  teamId,
  onClose,
}: DeleteTeamScreenProps) => {
  const { t } = useTranslation("companies");
  const { close: closeDrawer } = useDrawers();

  const { mutate, isPending } = useDeleteTeamMutation({
    teamId,
    onSuccess: () => {
      onClose();
      closeDrawer();
    },
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteTeam.title")}
      message={t("deleteTeam.message")}
      confirmLabel={t("deleteTeam.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
