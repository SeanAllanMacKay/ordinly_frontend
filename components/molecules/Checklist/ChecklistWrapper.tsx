import { ChecklistWrapperProps } from "./types";
import React from "react";
import { View } from "react-native";

export const ChecklistWrapper = ({ children }: ChecklistWrapperProps) => {
  return <View>{children}</View>;
};
