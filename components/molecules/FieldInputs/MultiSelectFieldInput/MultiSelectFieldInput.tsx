import { FormField, MultiSelectInput } from "@/components/atoms";
import { MultiSelectFieldInputProps } from "./types";
import React from "react";

export const MultiSelectFieldInput = <ValueType,>({
  name,
  label,
  validation,
  options,
}: MultiSelectFieldInputProps<ValueType>) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <MultiSelectInput {...props} options={options} />}
      validation={validation}
    />
  );
};
