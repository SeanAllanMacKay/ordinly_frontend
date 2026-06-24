import React from "react";
import { Switch } from "react-native-paper";
import { ToggleInputProps } from "./types";

export const ToggleInput = ({ value, onChange, isDisabled }: ToggleInputProps) => {
  return (
    <Switch value={value} onValueChange={onChange} disabled={isDisabled} />
  );
};
