import { useGetWorkerOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiWorkerDataFieldInputProps } from "./types";

export const MultiWorkerDataFieldInput = ({
  name,
  label = "Workers",
  validation,
  companyId,
}: MultiWorkerDataFieldInputProps) => {
  const options = useGetWorkerOptionsQuery({ companyId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
