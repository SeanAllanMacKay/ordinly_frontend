import React from "react";
import { useTranslation } from "react-i18next";
import {
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
  PhaseDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditProjectTaskLinksInputs = ({
  projectId,
}: {
  projectId: string;
}) => {
  // `common` namespace: the link labels are shared and `tasks.phase` is an
  // object (the add-phase screen strings), which would shadow the "phase" label.
  const { t } = useTranslation("common");
  const companyId = useActiveCompanyId();

  return (
    <>
      <PhaseDataFieldInput
        name="phaseId"
        label={t("phase")}
        companyId={companyId ?? ""}
        projectId={projectId}
      />

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
