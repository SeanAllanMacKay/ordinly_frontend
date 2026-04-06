import { FormField } from "@/components/atoms";
import { Checkbox } from "@/components/atoms";
import { CheckboxInputFieldProps } from "./types";
import React from "react";

export const CheckboxInputField = ({
  name,
  label,
  validation,
}: CheckboxInputFieldProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={Checkbox}
      validation={validation}
    />
  );
};
