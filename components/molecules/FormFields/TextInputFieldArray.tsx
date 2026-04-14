import { Button, FormFieldArray } from "@/components/atoms";
import { TextInput } from "@/components/atoms";
import { TextInputFieldArrayProps } from "./types";
import React from "react";
import { View } from "react-native";
import { textInputFieldArrayStyle } from "./styles";

export const TextInputFieldArray = ({
  name,
  label,
  itemValidation,
}: TextInputFieldArrayProps) => {
  return (
    <FormFieldArray
      name={name}
      label={label}
      defaultItemValue={{ value: "" }}
      wrapper={<View style={textInputFieldArrayStyle.wrapper} />}
      itemComponent={({ index, onRemove, value, onChange, ...restProps }) => (
        <View style={textInputFieldArrayStyle.container}>
          <View style={textInputFieldArrayStyle.inputContainer}>
            <TextInput
              {...restProps}
              label={`Item ${index + 1}`}
              value={value.value}
              onChange={(newValue) => onChange({ value: newValue })}
            />
          </View>

          {onRemove ? <Button icon="remove" onPress={onRemove} /> : null}
        </View>
      )}
      itemValidation={itemValidation}
    />
  );
};
