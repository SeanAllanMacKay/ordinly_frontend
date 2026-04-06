import { Typography } from "@/components/atoms";
import { Spacing } from "@/styles";
import React from "react";
import { View } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { Badge } from "@/components/atoms";

export const TabBar = ({ tabs, onChange, activeIndex }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: Spacing.md,
      }}
    >
      {tabs.map(({ label, value, badge }, index) => (
        <Badge value={badge} key={value}>
          <TouchableRipple
            onPress={() => onChange(index)}
            rippleColor={`${theme.colors.primary}20`}
            style={{
              alignItems: "center",
              borderBottomWidth: 2,
              // Visual indicator for the active tab
              borderBottomColor:
                activeIndex === index ? theme.colors.primary : "transparent",
              padding: Spacing.sm,
            }}
          >
            <Typography
              color={activeIndex === index ? "primary" : "onBackground"}
            >
              {label}
            </Typography>
          </TouchableRipple>
        </Badge>
      ))}
    </View>
  );
};
