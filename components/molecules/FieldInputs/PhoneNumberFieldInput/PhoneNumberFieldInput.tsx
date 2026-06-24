import { FormField, PhoneNumberInput } from "@/components/atoms";
import { phoneValidator } from "@/util/validation";
import { PhoneNumberFieldInputProps } from "./types";
import React from "react";

export const PhoneNumberFieldInput = ({
  name,
  label,
  validation,
}: PhoneNumberFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => <PhoneNumberInput {...props} />}
      validation={{ phoneValidator, ...validation }}
    />
  );
};
