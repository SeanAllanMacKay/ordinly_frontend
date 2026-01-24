import React, { useState } from "react";
import { ViewStyle, StyleSheet } from "react-native";
import { Screen, ScreenContainer } from "react-native-screens";

import { useNavigatorContext } from "@/components/organisms/Navigation/hooks";

export const TabbedSlot = ({
  detachInavtiveScreens = true,
  style,
  isRowLayout,
}: {
  detachInavtiveScreens?: boolean;
  style?: ViewStyle;
  isRowLayout: boolean;
}) => {
  const { state, descriptors } = useNavigatorContext();
  const focusedRouteKey = state.routes[state.index].key;
  const [loaded, setLoaded] = useState([focusedRouteKey]);

  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }

  const { routes } = state;

  return (
    <ScreenContainer
      enabled={detachInavtiveScreens}
      hasTwoStates
      style={styles.container}
    >
      {routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const { lazy = true, unmountOnBlur } = descriptor.options;
        const isFocused = state.index === index;

        if (unmountOnBlur && !isFocused) {
          return null;
        }

        if (lazy && !loaded.includes(route.key) && !isFocused) {
          return null;
        }

        return (
          <Screen
            activityState={isFocused ? 2 : 0}
            key={route.key}
            style={[
              StyleSheet.absoluteFill,
              { overflow: "hidden", zIndex: isFocused ? 0 : -1 },
              style,
            ]}
            accessibilityElementsHidden={!isFocused}
            importantForAccessibility={
              isFocused ? "auto" : "no-hide-descendants"
            }
            enabled={detachInavtiveScreens}
            freezeOnBlur={descriptor.options.freezeOnBlur}
          >
            {descriptor.render()}
          </Screen>
        );
      })}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
});
