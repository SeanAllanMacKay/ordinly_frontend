import { Typography } from "@/components/atoms/Typography";
import React from "react";
import { Platform, Pressable, View } from "react-native";
import { TabsProps } from "./types";
import { leftTabsStyles } from "./styles";
import { useTheme } from "react-native-paper";
import { Icon } from "@/components/atoms";
import { EntitySwitcher } from "./EntitySwitcher";
import { useIsDesktop } from "@/styles";

export const LeftTabs = ({ tabs, onPress }: TabsProps) => {
  const theme = useTheme();
  const isDesktop = useIsDesktop();

  return (
    <View
      style={[
        leftTabsStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Typography
        colorOverride="#ffffff"
        emphasis="high"
        size={Platform.select({ default: "md", web: "lg" })}
      >
        Ordinly
      </Typography>

      <EntitySwitcher />

      <View>
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
                { minWidth: isDesktop ? 240 : 160 },
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
    </View>
  );
};
