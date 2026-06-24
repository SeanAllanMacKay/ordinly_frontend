import { FormField, TextInput } from "@/components/atoms";
import { emailValidator } from "@/util/validation";
import { EmailFieldInputProps } from "./types";
import React from "react";

export const EmailFieldInput = ({
  name,
  label,
  validation,
  isAutoFocus,
}: EmailFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <TextInput
          {...props}
          keyboardType="email-address"
          isAutoFocus={isAutoFocus}
        />
      )}
      validation={{ emailValidator, ...validation }}
    />
  );
};
