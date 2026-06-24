import { Button, FormFieldArray, TextInput } from "@/components/atoms";
import { TextFieldInputArrayProps } from "./types";
import React from "react";
import { View } from "react-native";
import { textFieldInputArrayStyle } from "./styles";

export const TextFieldInputArray = ({
  name,
  label,
  itemValidation,
}: TextFieldInputArrayProps) => {
  return (
    <FormFieldArray
      name={name}
      label={label}
      defaultItemValue={{ value: "" }}
      wrapper={<View style={textFieldInputArrayStyle.wrapper} />}
      itemComponent={({ index, onRemove, value, onChange, ...restProps }) => (
        <View style={textFieldInputArrayStyle.container}>
          <View style={textFieldInputArrayStyle.inputContainer}>
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
