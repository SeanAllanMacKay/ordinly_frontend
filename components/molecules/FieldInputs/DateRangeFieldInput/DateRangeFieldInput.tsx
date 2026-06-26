import { DateRangeInput, FormField } from "@/components/atoms";
import React from "react";
import { DateRangeFieldInputProps } from "./types";

export const DateRangeFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  direction,
  min,
  max,
  startLabel,
  endLabel,
}: DateRangeFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      validation={validation}
      defaultValue={defaultValue}
      direction={direction}
      component={(props) => (
        <DateRangeInput
          {...props}
          min={min}
          max={max}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      )}
    />
  );
};
