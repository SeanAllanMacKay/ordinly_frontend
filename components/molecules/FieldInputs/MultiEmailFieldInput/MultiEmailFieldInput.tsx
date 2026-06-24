import { FormField, MultiValueInputWrapper, TextInput } from "@/components/atoms";
import { emailValidator } from "@/util/validation";
import { Chip } from "react-native-paper";
import { MultiEmailFieldInputProps } from "./types";
import React from "react";

export const MultiEmailFieldInput = ({
  name,
  label,
  validation,
}: MultiEmailFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <MultiValueInputWrapper<string>
          {...props}
          variant="compact"
          validate={emailValidator}
          component={(draftProps) => (
            <TextInput
              {...draftProps}
              value={draftProps.value ?? ""}
              keyboardType="email-address"
            />
          )}
          item={({ value, onRemove, isDisabled }) => (
            <Chip onClose={onRemove} disabled={isDisabled}>
              {value}
            </Chip>
          )}
        />
      )}
      validation={validation}
    />
  );
};
