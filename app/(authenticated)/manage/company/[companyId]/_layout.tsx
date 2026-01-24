import React, { useCallback } from "react";
import { ResponsiveNavigation, type TabType } from "@/components";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";

const COMPANY_MANAGE_TABS: TabType[] = [
  {
    name: "index",
    icon: "chart-bar-horizontal",
    title: "Dashboard",
    index: "index",
  },
  {
    name: "clients",
    icon: "blueprint",
    title: "Clients",
    index: "clients",
  },
  {
    name: "projects",
    icon: "presentation-chart",
    title: "Projects",
    index: "projects",
  },
  {
    name: "people",
    icon: "identification-card",
    title: "People",
    index: "people",
  },
  {
    name: "settings",
    icon: "gear",
    title: "Settings",
    index: "settings",
  },
];

export default function TabLayout() {
  const router = useRouter();

  const onBack = useCallback(
    () => router.push(routes.manage.companies.root()),
    [router]
  );

  return <ResponsiveNavigation tabs={COMPANY_MANAGE_TABS} onBack={onBack} />;
}
