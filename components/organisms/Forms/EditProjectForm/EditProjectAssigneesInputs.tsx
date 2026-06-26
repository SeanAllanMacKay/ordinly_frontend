import React from "react";
import { useTranslation } from "react-i18next";
import {
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";

export const EditProjectAssigneesInputs = () => {
  const { t } = useTranslation("projects");
  const { companyId } = useCurrentCompany();

  return (
    <>
      <MultiWorkerDataFieldInput
        name="userIds"
        label={t("workers")}
        companyId={companyId ?? ""}
      />

      <MultiTeamDataFieldInput
        name="teamIds"
        label={t("teams")}
        companyId={companyId ?? ""}
      />
    </>
  );
};
