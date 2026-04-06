import React from "react";
import { View } from "react-native";
import { TabSceneProps } from "./types";

export const TabScene = ({ children }: TabSceneProps) => {
  return <View>{children}</View>;
};
