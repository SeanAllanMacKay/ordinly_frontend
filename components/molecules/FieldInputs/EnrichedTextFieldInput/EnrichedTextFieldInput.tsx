import { EnrichedTextInput, FormField } from "@/components/atoms";
import { EnrichedTextFieldInputProps } from "./types";
import React from "react";

export const EnrichedTextFieldInput = ({
  name,
  label,
  validation,
}: EnrichedTextFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={({ onChange, value, isDisabled, isLoading, index }) => (
        <EnrichedTextInput
          label={label}
          onChange={onChange}
          value={value}
          isDisabled={isDisabled}
          isLoading={isLoading}
          index={index}
        />
      )}
      validation={validation}
    />
  );
};
