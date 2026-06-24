import { FormField } from "@/components/atoms";
import { LocationSearchInput } from "./LocationSearchInput";
import { LocationDataFieldInputProps } from "./types";
import React from "react";

export const LocationDataFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  defaultDisplayValue,
}: LocationDataFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <LocationSearchInput
          {...props}
          defaultDisplayValue={defaultDisplayValue}
        />
      )}
      validation={validation}
      defaultValue={defaultValue}
    />
  );
};
