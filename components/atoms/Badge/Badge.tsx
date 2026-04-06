import React from "react";
import { View } from "react-native";
import { Badge as RNPBadge } from "react-native-paper";
import { BadgeProps } from "./types";
import { badgeStyles } from "./styles";
import { Spacing } from "@/styles";

export const Badge = ({ children, value }: BadgeProps) => {
  return (
    <View style={badgeStyles.container}>
      {children}
      <View style={badgeStyles.badgeContainer}>
        <RNPBadge visible={!!value} size={Spacing.md}>
          {typeof value === "number" ? value : ""}
        </RNPBadge>
      </View>
    </View>
  );
};
