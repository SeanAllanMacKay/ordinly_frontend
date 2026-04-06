import React, { PropsWithChildren } from "react";
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
  id: string;
  name: string;
  icon: IconProps["name"];
  index: string;
  title: string;
};

export const MainNavigation = ({
  tabs,
}: PropsWithChildren<{ tabs: TabType[] }>) => {
  const isRowLayout = useWidth(SMALL_BREAKPOINT);

  return (
    <TabbedNavigator>
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
          {isRowLayout ? <SideBar tabs={tabs} /> : null}

          <TabbedNavigator.Slot />

          {!isRowLayout ? <TabBar tabs={tabs} /> : null}
        </View>
      </View>
    </TabbedNavigator>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, display: "flex", flexDirection: "column" },
});
