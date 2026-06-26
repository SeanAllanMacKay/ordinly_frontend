import { useGetWorkerOptionsQuery } from "@/api";
import { AssignedUsersFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { AssignedUsersDataFieldInputProps } from "./types";

export const AssignedUsersDataFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  direction,
  companyId,
}: AssignedUsersDataFieldInputProps) => {
  const { t } = useTranslation("common");
  const options = useGetWorkerOptionsQuery({ companyId });

  return (
    <AssignedUsersFieldInput
      name={name}
      label={label ?? t("workers")}
      validation={validation}
      defaultValue={defaultValue}
      direction={direction}
      options={options.data ?? []}
      placeholder={t("selectWorkers")}
      modalTitle={t("selectWorkers")}
    />
  );
};
