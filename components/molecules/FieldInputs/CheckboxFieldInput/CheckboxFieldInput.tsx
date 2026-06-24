import { CheckboxInput, FormField } from "@/components/atoms";
import { CheckboxFieldInputProps } from "./types";
import React from "react";

export const CheckboxFieldInput = ({
  name,
  label,
  validation,
}: CheckboxFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={CheckboxInput}
      validation={validation}
    />
  );
};
