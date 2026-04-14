import { EnrichedTextInput, FormField } from "@/components/atoms";
import { TextInputFieldProps } from "./types";
import React from "react";

export const EnrichedTextInputField = ({
  name,
  label,
  validation,
}: TextInputFieldProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={({ onChange, value, isDisabled, isLoading, index }) => (
        <EnrichedTextInput
          label={label}
          onChange={onChange}
          initialValue={value}
          isDisabled={isDisabled}
          isLoading={isLoading}
          index={index}
        />
      )}
      validation={validation}
    />
  );
};
