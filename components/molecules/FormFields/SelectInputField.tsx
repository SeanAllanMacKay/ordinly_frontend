import { FormField } from "@/components/atoms";
import { Select } from "@/components/atoms";
import { SelectInputFieldProps } from "./types";
import React from "react";

export const SelectInputField = <ValueType,>({
  name,
  label,
  validation,
  options,
}: SelectInputFieldProps<ValueType>) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <Select {...props} options={options} />}
      validation={validation}
    />
  );
};
