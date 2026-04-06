import React from "react";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import { CheckboxProps } from "./types";
import { View } from "react-native";
import { Typography } from "../Typography";

export const Checkbox = ({
  value,
  onChange,
  isDisabled,
  label,
}: CheckboxProps) => {
  return (
    <View>
      <RNPCheckbox
        status={value ? "checked" : "unchecked"}
        onPress={() => onChange(!value)}
        disabled={isDisabled}
      />

      {label ? <Typography>{label}</Typography> : null}
    </View>
  );
};
