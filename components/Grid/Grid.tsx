import { Spacing } from "@/constants/Spacing";
import React, { ReactElement } from "react";
import { View } from "react-native";

const directionMap = {
  vertical: "column",
  horizontal: "row",
} as const;

export const Grid = ({
  direction = "vertical",
  gap = Spacing.m,
  children,
}: {
  direction?: "horizontal" | "vertical";
  gap?: (typeof Spacing)[keyof typeof Spacing];
  children: Iterable<ReactElement> | ReactElement;
}) => {
  return (
    <View
      style={{ display: "flex", flexDirection: directionMap[direction], gap }}
    >
      {children}
    </View>
  );
};
