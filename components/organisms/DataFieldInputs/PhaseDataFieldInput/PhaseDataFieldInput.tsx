import { useGetPhaseOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { PhaseDataFieldInputProps } from "./types";

export const PhaseDataFieldInput = ({
  name,
  label = "Phase",
  validation,
  companyId,
  projectId,
}: PhaseDataFieldInputProps) => {
  const options = useGetPhaseOptionsQuery({ companyId, projectId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
