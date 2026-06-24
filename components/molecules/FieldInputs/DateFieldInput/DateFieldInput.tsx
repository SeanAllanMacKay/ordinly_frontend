import { DateInput, FormField } from "@/components/atoms";
import { DateFieldInputProps } from "./types";
import React from "react";

export const DateFieldInput = ({
  name,
  label,
  validation,
  min,
  max,
}: DateFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <DateInput {...props} min={min} max={max} />}
      validation={validation}
    />
  );
};
