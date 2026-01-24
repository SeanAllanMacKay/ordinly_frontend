import React, { useCallback } from "react";
import { Screen } from "react-native-screens";
import { StyleSheet } from "react-native";
import { FullScreenModal } from "./FullScreenModal";
import { Header } from "./Header";

export const Content = ({ route, isFocused, screenOptions, descriptor }) => {
  const Render = useCallback(() => descriptor.render(), [descriptor.render]);

  return (
    <Screen
      key={route.key}
      style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
      freezeOnBlur
      activityState={isFocused ? 2 : 0}
    >
      {screenOptions.isModal ? (
        <FullScreenModal screenOptions={screenOptions}>
          <Render />
        </FullScreenModal>
      ) : (
        <>
          <Header screenOptions={screenOptions} />
          <Render />
        </>
      )}
    </Screen>
  );
};
