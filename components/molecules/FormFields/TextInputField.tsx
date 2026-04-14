import { FormField, TextInput } from "@/components/atoms";
import { TextInputFieldProps } from "./types";
import React from "react";

export const TextInputField = ({
  name,
  label,
  validation,
}: TextInputFieldProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={TextInput}
      validation={validation}
    />
  );
};
