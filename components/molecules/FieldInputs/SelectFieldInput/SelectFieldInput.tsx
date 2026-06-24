import { FormField, SelectInput } from "@/components/atoms";
import { SelectFieldInputProps } from "./types";
import React from "react";

export const SelectFieldInput = <ValueType,>({
  name,
  label,
  validation,
  options,
}: SelectFieldInputProps<ValueType>) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <SelectInput {...props} options={options} />}
      validation={validation}
    />
  );
};
