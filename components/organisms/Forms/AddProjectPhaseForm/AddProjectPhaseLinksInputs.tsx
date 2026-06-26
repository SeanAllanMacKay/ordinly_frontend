import React from "react";
import { useTranslation } from "react-i18next";
import { MultiTaskDataFieldInput } from "@/components/organisms/DataFieldInputs";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";

export const AddProjectPhaseLinksInputs = ({
  projectId,
}: {
  projectId: string;
}) => {
  // `common` namespace: these link labels are shared across forms.
  const { t } = useTranslation("common");
  const { companyId } = useCurrentCompany();

  return (
    <MultiTaskDataFieldInput
      name="taskIds"
      label={t("tasks")}
      companyId={companyId ?? ""}
      projectId={projectId}
    />
  );
};
