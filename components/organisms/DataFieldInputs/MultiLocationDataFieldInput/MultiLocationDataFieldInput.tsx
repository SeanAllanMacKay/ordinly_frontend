import { FormField, MultiValueInputWrapper } from "@/components/atoms";
import { Chip } from "react-native-paper";
import {
  LocationSearchInput,
  LocationValue,
  formatLocationDisplayValue,
} from "../LocationDataFieldInput";
import { MultiLocationDataFieldInputProps } from "./types";
import React from "react";

export const MultiLocationDataFieldInput = ({
  name,
  label,
  validation,
}: MultiLocationDataFieldInputProps) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <MultiValueInputWrapper<LocationValue>
          {...props}
          variant="list"
          showAddButton={false}
          component={(draftProps) => <LocationSearchInput {...draftProps} />}
          item={({ value, onRemove, isDisabled }) => (
            <Chip onClose={onRemove} disabled={isDisabled}>
              {formatLocationDisplayValue(value)}
            </Chip>
          )}
        />
      )}
      validation={validation}
    />
  );
};
