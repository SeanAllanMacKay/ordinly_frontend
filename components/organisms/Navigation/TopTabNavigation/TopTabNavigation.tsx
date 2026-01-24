import { useFilterScreenChildren } from "expo-router/build/layouts/withLayoutContext";
import { useContextKey } from "expo-router/build/Route";
import { useSortedScreens } from "expo-router/build/useScreens";

import { Slot } from "expo-router";
import React, { ReactElement, useMemo } from "react";

import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "@bacons/react-views";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigation = ({
  children,
  screenOptions,
}: {
  children?: React.ReactNode;
  screenOptions?: MaterialTopTabNavigationOptions;
}) => {
  const contextKey = useContextKey();
  const { screens, children: other } = useFilterScreenChildren(children, {
    isCustomNavigator: true,
    contextKey,
  });

  const sorted = useSortedScreens(screens ?? []);

  if (!sorted.length) {
    console.warn(`Layout at "${contextKey}" has no children.`);
    return null;
  }

  const mappedScreens = useMemo(() => {
    return other.map(({ props }) => {
      const screen = (sorted as ReactElement[]).find(
        ({ props: { name } }) => name === props.name
      );

      if (!screen || ["string", "number", true].includes(typeof screen)) {
        return;
      }

      return {
        ...screen,
        props: {
          ...screen.props,
          ...props,
          options: {
            ...screen.props.options,
            ...(props?.title ? { title: props.title } : {}),
          },
        },
      };
    });
  }, [sorted.length, other]);

  return (
    <Tab.Navigator screenOptions={screenOptions}>{mappedScreens}</Tab.Navigator>
  );
};

TopTabNavigation.Screen = ({
  name,
  title,
}: {
  name: string;
  title: string;
}) => (
  <Tab.Screen name={name} options={{ title }} component={Slot}></Tab.Screen>
);

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
});
