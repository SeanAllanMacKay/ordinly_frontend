import { useGetContactOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { ContactDataFieldInputProps } from "./types";

export const ContactDataFieldInput = ({
  name,
  label = "Contact",
  validation,
  companyId,
  clientId,
}: ContactDataFieldInputProps) => {
  const options = useGetContactOptionsQuery({ companyId, clientId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
