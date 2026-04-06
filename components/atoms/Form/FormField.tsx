import React, { useContext, useMemo } from "react";

import {
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { View } from "react-native";
import { FormLoadingStateContext } from "./Form";
import { formFieldStyles } from "./styles";
import { Typography } from "../Typography";
import { FormFieldProps } from "./types";

export const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  component,
  validation,
}: FormFieldProps<TFieldValues, TName>) => {
  const { control, getValues } = useFormContext<TFieldValues>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const index = useMemo(() => {
    const keys = Object.keys(getValues());
    return keys.indexOf(name);
  }, [name, getValues]);

  const {
    field: { value, onChange, onBlur, disabled },
    fieldState: { error: { message: errorMessage } = {} },
  } = useController({
    name,
    control,
    rules: { validate: validation },
  });

  return (
    <View style={formFieldStyles.container}>
      {component({
        value,
        onChange,
        onBlur,
        isDisabled: disabled,
        isError: !!errorMessage,
        label,
        isLoading: formLoadingState.isLoading,
        index,
      })}

      <View style={formFieldStyles.errorContainer}>
        <Typography color="error">{errorMessage}</Typography>
      </View>
    </View>
  );
};
