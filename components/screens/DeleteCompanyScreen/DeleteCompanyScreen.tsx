import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ConfirmDeleteModal } from "@/components";
import { useDeleteCompanyMutation } from "@/api";
import { routes } from "@/constants/routes";
import { DeleteCompanyScreenProps } from "./types";

export const DeleteCompanyScreen = ({
  companyId,
  onClose,
}: DeleteCompanyScreenProps) => {
  const { t } = useTranslation("companies");
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
      title={t("deleteCompany.title")}
      message={t("deleteCompany.message")}
      confirmLabel={t("deleteCompany.confirmLabel")}
      isDeleting={isPending}
      onConfirm={() => mutate()}
      onClose={onClose}
    />
  );
};
