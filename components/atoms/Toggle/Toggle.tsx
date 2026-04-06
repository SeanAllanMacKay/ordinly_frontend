import React from "react";
import { Switch } from "react-native-paper";
import { ToggleProps } from "./types";

export const Toggle = ({ value, onChange }: ToggleProps) => {
  return <Switch value={value} onValueChange={onChange} />;
};
