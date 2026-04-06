import { FormField } from "@/components/atoms";
import { TextInput } from "@/components/atoms";
import { TextInputFieldProps } from "./types";
import React from "react";

export const TextInputField = ({
  name,
  label,
  validation,
  isEditable,
  type,
}: TextInputFieldProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <TextInput {...props} isEditable={isEditable} type={type} />
      )}
      validation={validation}
    />
  );
};
