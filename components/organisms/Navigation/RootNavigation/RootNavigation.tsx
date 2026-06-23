import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { Spacing } from "@/styles";
import { RootNavigationProps } from "./types";
import { rootNavigationStyles } from "./styles";
import { LeftTabs } from "./LeftTabs";
import { BottomTabs } from "./BottomTabs";
import { EntitySwitcher } from "./EntitySwitcher";
import { VerificationBanner } from "../../VerificationBanner";
import { ThemeScope } from "@/styles/ThemeScope";

export const ResponsiveNavigator = ({
  children,
  initialRouteName,
  screenOptions,
}: RootNavigationProps) => {
  const isPhone = useIsPhone();
  const insets = useSafeAreaInsets();

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
        {!isPhone ? (
          <ThemeScope scheme="dark">
            <LeftTabs tabs={tabs} onPress={onPress} />
          </ThemeScope>
        ) : null}

        <View style={rootNavigationStyles.content}>
          <VerificationBanner />
          {descriptor.render()}

          {isPhone ? (
            <View
              style={[
                rootNavigationStyles.mobileEntitySwitcher,
                { top: insets.top + Spacing.sm },
              ]}
            >
              <EntitySwitcher />
            </View>
          ) : null}
        </View>

        {isPhone ? <BottomTabs tabs={tabs} onPress={onPress} /> : null}
      </View>
    </NavigationContent>
  );
};

const { Navigator: BaseNavigator } =
  createNavigatorFactory(ResponsiveNavigator)();

export const RootNavigation = withLayoutContext(BaseNavigator, undefined, true);
