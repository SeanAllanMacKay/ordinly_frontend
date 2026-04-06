import React from "react";
import { View } from "react-native";
import {
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
} from "@react-navigation/native";
import { Slot, withLayoutContext } from "expo-router";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { RootNavigationProps } from "./types";
import { rootNavigationStyles } from "./styles";
import { LeftTabs } from "./LeftTabs";
import { BottomTabs } from "./BottomTabs";

export const ResponsiveNavigator = ({
  children,
  initialRouteName,
  screenOptions,
}: RootNavigationProps) => {
  const isPhone = useIsPhone();

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
      routeName: route.name,
      ...options,
    };
  });

  const onPress = (newRouteKey: (typeof state.routes)[number]["name"]) => {
    navigation.navigate(newRouteKey);
  };

  return (
    <NavigationContent>
      <View
        style={[
          rootNavigationStyles.container,
          isPhone
            ? rootNavigationStyles.vertical
            : rootNavigationStyles.horizontal,
        ]}
      >
        {!isPhone ? <LeftTabs tabs={tabs} onPress={onPress} /> : null}

        <View style={rootNavigationStyles.content}>{descriptor.render()}</View>

        {isPhone ? <BottomTabs tabs={tabs} onPress={onPress} /> : null}
      </View>
    </NavigationContent>
  );
};

const { Navigator: BaseNavigator } =
  createNavigatorFactory(ResponsiveNavigator)();

export const RootNavigation = withLayoutContext(BaseNavigator, undefined, true);
