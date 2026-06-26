import React from "react";
import { useTranslation } from "react-i18next";
import {
  MultiTaskDataFieldInput,
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddProjectPhaseLinksInputs = ({
  projectId,
}: {
  projectId: string;
}) => {
  // `common` namespace: these link labels are shared across forms.
  const { t } = useTranslation("common");
  const companyId = useActiveCompanyId();

  return (
    <>
      <MultiTaskDataFieldInput
        name="taskIds"
        label={t("tasks")}
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
