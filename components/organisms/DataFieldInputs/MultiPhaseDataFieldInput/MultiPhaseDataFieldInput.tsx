import { useGetPhaseOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiPhaseDataFieldInputProps } from "./types";

export const MultiPhaseDataFieldInput = ({
  name,
  label = "Phases",
  validation,
  companyId,
  projectId,
}: MultiPhaseDataFieldInputProps) => {
  const options = useGetPhaseOptionsQuery({ companyId, projectId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
