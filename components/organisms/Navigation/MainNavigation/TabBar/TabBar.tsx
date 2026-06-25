import React, { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "@bacons/react-views";
import { Text, useTheme } from "react-native-paper";
import { Platform, View } from "react-native";
import { useTranslation } from "react-i18next";

import { TabBarItem } from "./TabBarItem";
import { Spacing } from "@/styles";
import { TabType } from "../MainNavigation";
import { Icon } from "@/components/atoms";

export const TabBar = ({ tabs }: { tabs: TabType[] }) => {
  const { colors } = useTheme();
  const { t } = useTranslation("navigation");

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
          paddingHorizontal: Spacing.md,
          backgroundColor: "#fff",
        },
      }),
    [colors],
  );

  return (
    <View style={[{ paddingBottom: useSafeAreaInsets().bottom }]}>
      <View style={styles.nav}>
        {tabs.map((tab) => (
          <TabBarItem key={tab.id} name={tab.name} id={tab.index}>
            {({ focused, pressed, hovered }) => (
              <View style={{ display: "flex", alignItems: "center" }}>
                <Icon name={tab.icon} />

                <Text
                  style={[
                    {
                      color: "#000000",
                      fontSize: 12,
                    },
                    focused && { fontWeight: "bold" },
                  ]}
                >
                  {t(tab.title, { defaultValue: tab.title })}
                </Text>
              </View>
            )}
          </TabBarItem>
        ))}
      </View>
    </View>
  );
};
