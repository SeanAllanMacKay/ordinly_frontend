import React from "react";
import { Platform, View } from "react-native";
import { StyleSheet } from "@bacons/react-views";

import { LARGE_BREAKPOINT } from "@/constants/breakpoints";
import cssStyles from "@/styles/root-layout.module.scss";

import { Logo } from "@/components";
import { SideBarItem } from "./SideBarItem";
import { TabType } from "../MainNavigation";

import { cns, useWidth } from "@/styles";
import { useTranslation } from "react-i18next";

const NAV_MEDIUM_WIDTH = 244;

export const SideBar = ({ tabs }: { tabs: TabType[] }) => {
  const isLarge = useWidth(LARGE_BREAKPOINT);
  const { t } = useTranslation("navigation");

  return (
    <View
      style={[
        styles.sideBar,
        ...Platform.select({
          default: [isLarge && { minWidth: NAV_MEDIUM_WIDTH }],
        }),
      ]}
    >
      <View
        style={[
          styles.sideBarInner,
          ...Platform.select({
            default: [
              isLarge && {
                width: NAV_MEDIUM_WIDTH,
                minWidth: NAV_MEDIUM_WIDTH,
                alignItems: "flex-start",
              },
            ],
            web: [cns(cssStyles.sideBarInner)],
          }),
        ]}
      >
        <View
          style={[
            { zIndex: 3 },
            styles.sideBarInner2,
            ...Platform.select({
              default: [!isLarge && { alignItems: "center" }],
              web: [cns(cssStyles.sideBarHeader)],
            }),
          ]}
        >
          <View style={{ gap: 4, flex: 1 }}>
            {tabs.map(({ title, name, id, icon }) => (
              <SideBarItem key={id} name={name} icon={icon}>
                {t(title, { defaultValue: title })}
              </SideBarItem>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideBar: {
    minWidth: 72,
    width: 72,
    backgroundColor: "#fff",
  },
  sideBarInner: {
    position: Platform.select({ default: "absolute", web: "fixed" }),
    height: "100%",
    maxHeight: "100%",
    alignItems: "stretch",
    borderRightWidth: 1,
    borderRightColor: "grey",
    minWidth: 72,
    width: 72,
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  sideBarInner2: {
    flex: 1,
    alignItems: "stretch",
    height: "100%",
    justifyContent: "space-between",
  },
});
