import {
  FormField,
  MultiValueInputWrapper,
  PhoneNumberInput,
  PhoneNumberInputValue,
  formatPhoneNumber,
} from "@/components/atoms";
import { phoneValidator } from "@/util/validation";
import { Chip } from "react-native-paper";
import { MultiPhoneNumberFieldInputProps } from "./types";
import React from "react";

export const MultiPhoneNumberFieldInput = ({
  name,
  label,
  validation,
}: MultiPhoneNumberFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <MultiValueInputWrapper<PhoneNumberInputValue>
          {...props}
          variant="list"
          validate={phoneValidator}
          component={(draftProps) => <PhoneNumberInput {...draftProps} />}
          item={({ value, onRemove, isDisabled }) => (
            <Chip onClose={onRemove} disabled={isDisabled}>
              {formatPhoneNumber(value)}
            </Chip>
          )}
        />
      )}
      validation={validation}
    />
  );
};
