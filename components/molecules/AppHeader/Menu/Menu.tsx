import React from "react";
import { View } from "react-native";
import { Account } from "./Account";
import { AppSwitcher } from "./AppSwitcher";

export const Menu = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <AppSwitcher />

      <Account />
    </View>
  );
};
