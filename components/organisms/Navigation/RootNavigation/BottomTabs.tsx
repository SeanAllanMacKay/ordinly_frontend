import { Typography } from "@/components/atoms/Typography";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import { TabsProps } from "./types";
import { bottomTabsStyles } from "./styles";
import { Icon } from "@/components/atoms";
import { useTheme } from "react-native-paper";
import { Spacing } from "@/styles";

export const BottomTabs = ({ tabs, onPress }: TabsProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        bottomTabsStyles.container,
        { backgroundColor: theme.colors.background },
        Platform.select({
          default: { paddingBottom: Spacing.lg },
          web: { paddingBottom: Spacing.md },
        }),
      ]}
    >
      {tabs.map(({ title, isFocused, icon, routeName }) => (
        <Pressable
          onPress={() => {
            onPress(routeName);
          }}
          disabled={isFocused}
          key={`bottom-tab-${routeName}`}
        >
          <View
            key={`root-navigation-tab-${title}`}
            style={[
              bottomTabsStyles.tabContainer,
              isFocused && { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <Icon
              name={icon}
              size="lg"
              color={isFocused ? "onPrimaryContainer" : "onBackground"}
            />
            <Typography
              color={isFocused ? "onPrimaryContainer" : "onBackground"}
              size="xs"
            >
              {title}
            </Typography>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
