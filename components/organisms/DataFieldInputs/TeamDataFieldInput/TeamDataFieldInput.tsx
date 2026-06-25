import { useGetTeamOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { TeamDataFieldInputProps } from "./types";

export const TeamDataFieldInput = ({
  name,
  label = "Team",
  validation,
  companyId,
}: TeamDataFieldInputProps) => {
  const options = useGetTeamOptionsQuery({ companyId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
