import React from "react";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import { CheckboxInputProps } from "./types";
import { View } from "react-native";
import { Typography } from "../../Typography";
import { checkboxStyles } from "./styles";

export const CheckboxInput = ({
  value,
  onChange,
  isDisabled = false,
  label,
}: CheckboxInputProps) => {
  return (
    <View style={checkboxStyles.container}>
      <RNPCheckbox.Android
        status={value ? "checked" : "unchecked"}
        onPress={() => onChange(!value)}
        disabled={isDisabled}
      />

      {label ? <Typography>{label}</Typography> : null}
    </View>
  );
};
