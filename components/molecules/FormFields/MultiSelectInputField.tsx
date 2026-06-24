import { FormField, MultiSelect } from "@/components/atoms";
import { MultiSelectInputFieldProps } from "./types";
import React from "react";

export const MultiSelectInputField = <ValueType,>({
  name,
  label,
  validation,
  options,
}: MultiSelectInputFieldProps<ValueType>) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <MultiSelect {...props} options={options} />}
      validation={validation}
    />
  );
};
