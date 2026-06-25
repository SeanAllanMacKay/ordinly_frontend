import { useGetTeamOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiTeamDataFieldInputProps } from "./types";

export const MultiTeamDataFieldInput = ({
  name,
  label = "Teams",
  validation,
  companyId,
}: MultiTeamDataFieldInputProps) => {
  const options = useGetTeamOptionsQuery({ companyId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
