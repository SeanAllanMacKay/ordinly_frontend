import { useGetTaskOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiTaskDataFieldInputProps } from "./types";

export const MultiTaskDataFieldInput = ({
  name,
  label = "Tasks",
  validation,
  companyId,
  projectId,
}: MultiTaskDataFieldInputProps) => {
  const options = useGetTaskOptionsQuery({ companyId, projectId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
