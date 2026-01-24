import React, { useMemo } from "react";
import { ResponsiveNavigation, type TabType } from "@/components";
import { Slot, Stack, useSegments } from "expo-router";

const PERSONAL_MANAGE_TABS: TabType[] = [
  {
    name: "index",
    icon: "chart-bar-horizontal",
    title: "Dashboard",
    index: "index",
  },
  {
    name: "projects",
    icon: "presentation-chart",
    title: "Projects",
    index: "projects",
  },
  {
    name: "companies",
    icon: "building-office",
    title: "Companies",
    index: "companies",
  },
  {
    name: "account",
    icon: "user-circle-gear",
    title: "Account",
    index: "account",
  },
];

export default function TabLayout() {
  const segments = useSegments();

  const isCompanyView = useMemo(() => segments.includes("company"), [segments]);

  return (
    <>
      <ResponsiveNavigation
        tabs={PERSONAL_MANAGE_TABS}
        isShown={!isCompanyView}
      />
    </>
  );
}
