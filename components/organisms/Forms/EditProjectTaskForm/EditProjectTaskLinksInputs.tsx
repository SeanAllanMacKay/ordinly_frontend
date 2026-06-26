import React from "react";
import { useTranslation } from "react-i18next";
import { PhaseDataFieldInput } from "@/components/organisms/DataFieldInputs";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";

export const EditProjectTaskLinksInputs = ({
  projectId,
}: {
  projectId: string;
}) => {
  // `common` namespace: the link labels are shared and `tasks.phase` is an
  // object (the add-phase screen strings), which would shadow the "phase" label.
  const { t } = useTranslation("common");
  const { companyId } = useCurrentCompany();

  return (
    <PhaseDataFieldInput
      name="phaseId"
      label={t("phase")}
      companyId={companyId ?? ""}
      projectId={projectId}
    />
  );
};
