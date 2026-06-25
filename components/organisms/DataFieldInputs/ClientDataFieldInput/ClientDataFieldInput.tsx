import { useGetClientOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { ClientDataFieldInputProps } from "./types";

export const ClientDataFieldInput = ({
  name,
  label = "Client",
  validation,
  companyId,
}: ClientDataFieldInputProps) => {
  const options = useGetClientOptionsQuery({ companyId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
