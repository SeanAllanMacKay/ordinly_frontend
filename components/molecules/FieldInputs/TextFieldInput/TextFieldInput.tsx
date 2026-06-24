import { FormField, TextInput } from "@/components/atoms";
import { TextFieldInputProps } from "./types";
import React from "react";

export const TextFieldInput = ({
  name,
  label,
  validation,
  type,
  isEditable,
  isAutoFocus,
}: TextFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <TextInput
          {...props}
          type={type}
          isEditable={isEditable}
          isAutoFocus={isAutoFocus}
        />
      )}
      validation={validation}
    />
  );
};
