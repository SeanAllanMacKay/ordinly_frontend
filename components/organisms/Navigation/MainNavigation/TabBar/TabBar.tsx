import React, { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "@bacons/react-views";
import { Text, useTheme } from "react-native-paper";
import { Platform, View } from "react-native";

import { TabBarItem } from "./TabBarItem";
import { TabBarIcon } from "./TabBarIcon";
import { Spacing } from "@/constants/Spacing";
import { TabType } from "../MainNavigation";

export const TabBar = ({
  visible,
  tabs,
}: {
  tabs: TabType[];
  visible: boolean;
}) => {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        nav: {
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: colors.onBackground,
          justifyContent: "space-around",
          alignItems: "center",
          height: 48,
          paddingHorizontal: Spacing.m,
          backgroundColor: "#fff",
        },
      }),
    [colors]
  );

  return (
    <View
      style={[
        { paddingBottom: useSafeAreaInsets().bottom },
        Platform.select({
          default: { display: visible ? "flex" : "none" },
        }),
      ]}
    >
      <View style={styles.nav}>
        {tabs.map((tab) => (
          <TabBarItem key={tab.id} name={tab.name} id={tab.index}>
            {({ focused, pressed, hovered }) => (
              <View style={{ display: "flex", alignItems: "center" }}>
                <TabBarIcon name={tab.icon} focused={focused} />

                <Text
                  style={[
                    {
                      color: "#000000",
                      fontSize: 12,
                    },
                    focused && { fontWeight: "bold" },
                  ]}
                >
                  {tab.title}
                </Text>
              </View>
            )}
          </TabBarItem>
        ))}
      </View>
    </View>
  );
};
