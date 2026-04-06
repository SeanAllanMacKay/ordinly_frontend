import { Typography } from "@/components/atoms/Typography";
import React from "react";
import { Pressable, View } from "react-native";
import { TabsProps } from "./types";
import { leftTabsStyles } from "./styles";
import { useTheme } from "react-native-paper";
import { Icon } from "@/components/atoms";

export const LeftTabs = ({ tabs, onPress }: TabsProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        leftTabsStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {tabs.map(({ title, isFocused, icon, routeName }) => (
        <Pressable
          onPress={() => {
            onPress(routeName);
          }}
          disabled={isFocused}
          key={`left-tab-${routeName}`}
        >
          <View
            key={`root-navigation-tab-${title}`}
            style={[
              leftTabsStyles.tabContainer,
              isFocused && { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <Icon
              name={icon}
              size="lg"
              color={isFocused ? "onPrimaryContainer" : "onBackground"}
            />

            <View style={leftTabsStyles.labelContainer}>
              <Typography
                color={isFocused ? "onPrimaryContainer" : "onBackground"}
                size="xs"
              >
                {title}
              </Typography>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
