import { useGetProjectOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiProjectDataFieldInputProps } from "./types";

export const MultiProjectDataFieldInput = ({
  name,
  label = "Projects",
  validation,
  companyId,
}: MultiProjectDataFieldInputProps) => {
  const options = useGetProjectOptionsQuery({ companyId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
