import { useGetWorkerOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { WorkerDataFieldInputProps } from "./types";

export const WorkerDataFieldInput = ({
  name,
  label = "Worker",
  validation,
  companyId,
}: WorkerDataFieldInputProps) => {
  const options = useGetWorkerOptionsQuery({ companyId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
