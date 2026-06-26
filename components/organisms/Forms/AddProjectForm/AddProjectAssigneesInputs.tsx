import React from "react";
import { useTranslation } from "react-i18next";
import {
  AssignedTeamsDataFieldInput,
  AssignedUsersDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";

export const AddProjectAssigneesInputs = () => {
  const { t } = useTranslation("projects");
  const { companyId } = useCurrentCompany();

  return (
    <>
      <AssignedUsersDataFieldInput
        name="userIds"
        label={t("workers")}
        direction="horizontal"
        companyId={companyId ?? ""}
      />

      <AssignedTeamsDataFieldInput
        name="teamIds"
        label={t("teams")}
        direction="horizontal"
      />
    </>
  );
};
