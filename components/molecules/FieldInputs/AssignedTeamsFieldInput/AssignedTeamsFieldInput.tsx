import { AssignedTeamsInput, FormField } from "@/components/atoms";
import React from "react";
import { AssignedTeamsFieldInputProps } from "./types";

export const AssignedTeamsFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  direction,
  options,
  placeholder,
  modalTitle,
}: AssignedTeamsFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      validation={validation}
      defaultValue={defaultValue}
      direction={direction}
      component={(props) => (
        <AssignedTeamsInput
          {...props}
          options={options}
          placeholder={placeholder}
          modalTitle={modalTitle}
        />
      )}
    />
  );
};
