import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormFieldArrayProps } from "./types";
import { ConditionalWrapper } from "../ContitionalWrapper";
import React, { useContext } from "react";
import { FormLoadingStateContext } from "./Form";
import { Button } from "../Button";
import { View } from "react-native";
import { formFieldArrayStyles } from "./styles";

export const FormFieldArray = ({
  name,
  wrapper,
  itemComponent,
  defaultItemValue,
  itemValidation,
  label,
}: FormFieldArrayProps) => {
  const formLoadingState = useContext(FormLoadingStateContext);
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { validate: itemValidation },
  });

  return (
    <ConditionalWrapper wrapper={wrapper!} isWrapped={!!wrapper}>
      <>
        {fields.map((item, index) => (
          <Controller
            key={item.id}
            control={control}
            name={`${name}.${index}`}
            render={({
              field: { value, onChange, disabled },
              fieldState: { error },
            }) =>
              itemComponent({
                value,
                onChange,
                isError: !!error,
                isLoading: formLoadingState.isLoading,
                isDisabled: disabled,
                onRemove: fields.length > 1 ? () => remove(index) : undefined,
                item,
                index,
              })
            }
          />
        ))}

        <View style={formFieldArrayStyles.actionContainer}>
          <Button
            icon="plus"
            onPress={() => append(defaultItemValue)}
            label="Add"
          />
        </View>
      </>
    </ConditionalWrapper>
  );
};
