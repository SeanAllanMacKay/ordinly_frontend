import React from "react";
import { useTranslation } from "react-i18next";
import {
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";

export const AddProjectPhaseAssigneesInputs = () => {
  // `common` namespace: the worker/team labels are shared across forms.
  const { t } = useTranslation("common");
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
