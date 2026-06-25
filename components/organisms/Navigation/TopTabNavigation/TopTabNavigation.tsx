import React from "react";
import { withLayoutContext } from "expo-router";
import { TopTabNavigationProps } from "./types";
import {
  createNavigatorFactory,
  TabRouter,
  useNavigationBuilder,
} from "@react-navigation/native";
import { TabBar } from "@/components/templates/Tabs/TabBar";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export const TopTabNavigator = ({
  children,
  initialRouteName,
  screenOptions,
}: TopTabNavigationProps) => {
  const { t } = useTranslation("navigation");
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      initialRouteName,
      screenOptions,
    });

  const activeRouteKey = state.routes[state.index].key;
  const descriptor = descriptors[activeRouteKey];

  const tabs = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    return {
      isFocused,
      label: t(options.title, { defaultValue: options.title }),
      value: route.name,
      ...options,
    };
  });

  const onChange = (newIndex: number) => {
    navigation.navigate(tabs[newIndex].value);
  };

  return (
    <NavigationContent>
      <View>
        <TabBar
          tabs={tabs}
          onChange={onChange}
          activeIndex={tabs.findIndex(({ isFocused }) => isFocused)}
        />
        <View>{descriptor.render()}</View>
      </View>
    </NavigationContent>
  );
};

const { Navigator: BaseNavigator } = createNavigatorFactory(TopTabNavigator)();

export const TopTabNavigation = withLayoutContext(
  BaseNavigator,
  undefined,
  true,
);
