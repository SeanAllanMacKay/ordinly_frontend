import React, { useMemo, type ComponentProps } from "react";

import { StackRouter } from "@react-navigation/native";

import { Navigator, Stack as ERStack } from "expo-router";
import { StyleSheet } from "react-native";
import { ScreenContainer } from "react-native-screens";
import { Content } from "./Content";

export const Stack = (props: ComponentProps<typeof Navigator>) => {
  return (
    <Navigator {...props} router={StackRouter}>
      <StackContent additionalChildren={props.children} />
    </Navigator>
  );
};

const StackContent = ({ additionalChildren }) => {
  const { navigation, state, descriptors } = Navigator.useContext();
  const focusedRoute = state.routes[state.index];

  const { routes } = state;

  const additionalOptions = useMemo(() => {
    const options =
      additionalChildren.find(
        ({ props: { name } }) => name === focusedRoute.name
      )?.props?.options ?? {};

    if (options instanceof Function) {
      return options({ navigation, route: focusedRoute });
    }

    return options;
  }, [additionalChildren, focusedRoute, navigation]);

  const descriptor = descriptors[focusedRoute.key];

  const screenOptions = { ...descriptor.options, ...additionalOptions };

  console.log(routes);

  return (
    <ScreenContainer hasTwoStates style={styles.container}>
      {routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <Content
            descriptor={descriptor}
            route={route}
            isFocused={isFocused}
            screenOptions={screenOptions}
          />
        );
      })}
    </ScreenContainer>
  );
};

Stack.Screen = ERStack.Screen;

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
});
