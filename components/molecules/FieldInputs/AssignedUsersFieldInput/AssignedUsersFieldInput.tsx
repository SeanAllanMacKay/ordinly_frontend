import { AssignedUsersInput, FormField } from "@/components/atoms";
import React from "react";
import { AssignedUsersFieldInputProps } from "./types";

export const AssignedUsersFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  direction,
  options,
  placeholder,
  modalTitle,
}: AssignedUsersFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      validation={validation}
      defaultValue={defaultValue}
      direction={direction}
      component={(props) => (
        <AssignedUsersInput
          {...props}
          options={options}
          placeholder={placeholder}
          modalTitle={modalTitle}
        />
      )}
    />
  );
};
