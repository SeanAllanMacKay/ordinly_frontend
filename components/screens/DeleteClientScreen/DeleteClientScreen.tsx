import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteClientMutation } from "@/api";
import { useClientRoutes } from "@/util/navigation/useClientRoutes";
import { DeleteClientScreenProps } from "./types";

export const DeleteClientScreen = ({
  clientId,
  onClose,
}: DeleteClientScreenProps) => {
  const { t } = useTranslation("clients");
  const router = useRouter();
  const clientRoutes = useClientRoutes();

  const { mutate, isPending } = useDeleteClientMutation({
    clientId,
    onSuccess: () => {
      onClose();
      router.replace(clientRoutes.root());
    },
  });

  return (
    <ConfirmDeleteModal
      title={t("deleteClient.title")}
      message={t("deleteClient.message")}
      confirmLabel={t("deleteClient.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
