import { useGetProjectOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { ProjectDataFieldInputProps } from "./types";

export const ProjectDataFieldInput = ({
  name,
  label = "Project",
  validation,
  companyId,
}: ProjectDataFieldInputProps) => {
  const options = useGetProjectOptionsQuery({ companyId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
