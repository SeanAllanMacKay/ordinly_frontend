import { useGetContactOptionsQuery } from "@/api";
import { MultiSelectFieldInput } from "@/components/molecules";
import React from "react";
import { MultiContactDataFieldInputProps } from "./types";

export const MultiContactDataFieldInput = ({
  name,
  label = "Contacts",
  validation,
  companyId,
  clientId,
}: MultiContactDataFieldInputProps) => {
  const options = useGetContactOptionsQuery({ companyId, clientId });

  return (
    <MultiSelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
