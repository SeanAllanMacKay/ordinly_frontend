import React, { useContext, useMemo } from "react";

import {
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
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
  defaultValue,
}: FormFieldProps<TFieldValues, TName>) => {
  const { control, getValues } = useFormContext<TFieldValues>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const { t } = useTranslation();

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
    defaultValue,
  });

  return (
    <View style={formFieldStyles.container}>
      <Typography size="sm">{label}</Typography>
      {component({
        value,
        onChange,
        onBlur,
        isDisabled: disabled,
        isError: !!errorMessage,
        isLoading: formLoadingState.isLoading,
        index,
      })}

      {errorMessage ? (
        <View style={formFieldStyles.errorContainer}>
          {/* Validators and zod schemas return i18n keys (e.g.
              "validation:required"); translate here. `defaultValue` lets any
              non-key string (e.g. a raw server message) pass through unchanged
              without a missing-key warning. */}
          <Typography color="error">
            {t(errorMessage, { defaultValue: errorMessage })}
          </Typography>
        </View>
      ) : null}
    </View>
  );
};
