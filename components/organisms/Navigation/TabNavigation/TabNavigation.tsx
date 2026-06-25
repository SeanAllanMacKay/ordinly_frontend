import React from "react";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { TabNavigationProps } from "./types";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export const TabNavigation = ({
  children,
  screenOptions = { headerShown: true, isScrollable: true },
}: TabNavigationProps & {
  screenOptions?: { headerShown?: boolean; isScrollable?: boolean };
}) => {
  const theme = useTheme();
  const { t } = useTranslation("navigation");

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          display: screenOptions?.headerShown ? undefined : "none",
        },
        tabBarItemStyle: { width: "auto" },
        swipeEnabled: screenOptions.isScrollable,
        tabBarLabel: ({
          color,
          children,
        }: {
          color: string;
          children: string;
        }) => (
          <Typography colorOverride={color}>
            {t(children, { defaultValue: children })}
          </Typography>
        ),
      }}
    >
      {children}
    </MaterialTopTabs>
  );
};

TabNavigation.Screen = MaterialTopTabs.Screen;
