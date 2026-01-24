import React from "react";
import { Platform, View } from "react-native";
import { StyleSheet } from "@bacons/react-views";

import { SideBar } from "./SideBar";
import { TabBar } from "./TabBar";
import { TabbedNavigator } from "./TabbedSlot";
import { useWidth, cns } from "@/styles";

import cssStyles from "@/styles/root-layout.module.scss";
import { SMALL_BREAKPOINT } from "@/constants/breakpoints";
import { type IconProps } from "@/components";

export type TabType = {
  name: string;
  icon: IconProps["name"];
  index: string;
  title: string;
};

export const ResponsiveNavigation = ({
  isShown = true,
  tabs,
  onBack,
}: {
  isShown?: boolean;
  tabs: TabType[];
  onBack?: () => void;
}) => {
  const isRowLayout = useWidth(SMALL_BREAKPOINT);

  return (
    <TabbedNavigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <View style={[styles.flex]}>
        <View
          style={[
            { flex: 1 },
            Platform.select({
              default: { flexDirection: isRowLayout ? "row" : "column" },
              web: cns(cssStyles.container),
            }),
          ]}
        >
          <SideBar
            visible={isShown && isRowLayout}
            tabs={tabs}
            onBack={onBack}
          />
          <TabbedNavigator.Slot isRowLayout={isRowLayout} />
          <TabBar
            visible={isShown && !isRowLayout}
            tabs={tabs}
            onBack={onBack}
          />
        </View>
      </View>
    </TabbedNavigator>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, display: "flex", flexDirection: "column" },
});
