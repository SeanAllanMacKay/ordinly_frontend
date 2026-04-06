import { FormField } from "@/components/atoms";
import { DateInput } from "@/components/atoms";
import { DateInputFieldProps } from "./types";
import React from "react";

export const DateInputField = ({
  name,
  label,
  validation,
  min,
  max,
}: DateInputFieldProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <DateInput {...props} min={min} max={max} />}
      validation={validation}
    />
  );
};
