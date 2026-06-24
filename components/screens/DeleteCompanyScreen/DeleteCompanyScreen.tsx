import React from "react";
import { useRouter } from "expo-router";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteCompanyMutation } from "@/api";
import { routes } from "@/constants/routes";
import { DeleteCompanyScreenProps } from "./types";

export const DeleteCompanyScreen = ({
  companyId,
  onClose,
}: DeleteCompanyScreenProps) => {
  const router = useRouter();

  const { mutate, isPending } = useDeleteCompanyMutation({
    companyId,
    onSuccess: () => {
      onClose();
      router.replace(routes.manage.personal.companies.root());
    },
  });

  return (
    <ConfirmDeleteModal
      title="Delete company?"
      message="This will permanently delete the company and all of its projects, teams, and members. This action cannot be undone."
      confirmLabel="Delete company"
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
