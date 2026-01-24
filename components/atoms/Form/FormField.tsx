import { Spacing } from "@/constants/Spacing";
import React from "react";

import { Controller, FieldValues, type Validate } from "react-hook-form";
import { View } from "react-native";
import { Text } from "react-native-paper";

export type FormFieldProps<ValueType> = {
  name: string;
  label?: string;
  component: React.FC<{
    value: ValueType;
    onChange: (newValue: ValueType) => void;
    onBlur: () => void;
    isDisabled?: boolean;
    isError: boolean;
    label?: string;
  }>;
  validation?: Record<string, Validate<ValueType, FieldValues>>;
};

export const FormField = <ValueType,>({
  name,
  label,
  component: Component,
  validation,
}: FormFieldProps<ValueType>) => {
  return (
    <Controller
      name={name}
      rules={{
        validate: validation,
      }}
      render={({
        field: { value, onChange, onBlur, disabled },
        fieldState,
      }) => {
        return (
          <View style={{ marginBottom: Spacing.s }}>
            <Component
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isDisabled={disabled}
              isError={!!fieldState?.error?.message}
              label={label}
            />

            <Text
              variant="labelMedium"
              style={{
                color: "red",
                marginLeft: Spacing.xs,
                marginTop: Spacing.xs,
              }}
            >
              {fieldState?.error?.message}
            </Text>
          </View>
        );
      }}
    />
  );
};
