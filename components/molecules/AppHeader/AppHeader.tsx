import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "@bacons/react-views";
import { useTheme, Text } from "react-native-paper";

import { Menu } from "./Menu";
import { useGetCurrentUserQuery } from "@/api";

export const AppHeader = ({ visible = true }: { visible?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const userQuery = useGetCurrentUserQuery();

  const height = 40 + top;

  return (
    <>
      <View
        style={[
          Platform.select({
            default: !visible && { display: "none" },
          }),
          { height, paddingTop: top, borderBottomColor: colors.onBackground },
          styles.appHeader,
        ]}
      >
        <Text>Ordinly</Text>

        {userQuery.data ? <Menu /> : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appHeader: {
    zIndex: 10,
    backgroundColor: "white",
    top: 0,
    left: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    width: "100%",
  },
});
