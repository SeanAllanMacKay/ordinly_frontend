import React, { ComponentProps } from "react";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { TabNavigationProps } from "./types";
import { useTheme } from "react-native-paper";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export const TabNavigation = ({ children }: TabNavigationProps) => {
  const theme = useTheme();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarItemStyle: { width: "auto" },
      }}
    >
      {children}
    </MaterialTopTabs>
  );
};

TabNavigation.Screen = MaterialTopTabs.Screen;
