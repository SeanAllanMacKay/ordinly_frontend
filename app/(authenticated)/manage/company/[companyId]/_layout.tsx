import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";
import { ScreenHeader } from "@/components";

export default function CompanyLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "tabs.dashboard", icon: "chart-bar-horizontal" }}
      />
      <RootNavigation.Screen
        name="clients"
        options={{
          title: "tabs.clients",
          icon: "blueprint",
          header: () => <ScreenHeader title="tabs.clients" />,
        }}
      />
      <RootNavigation.Screen
        name="projects"
        options={{
          title: "tabs.projects",
          icon: "projects",
          header: () => <ScreenHeader title="tabs.projects" />,
        }}
      />
      <RootNavigation.Screen
        name="people"
        options={{
          title: "tabs.people",
          icon: "identification-card",
          header: () => <ScreenHeader title="tabs.people" />,
        }}
      />
      <RootNavigation.Screen
        name="settings"
        options={{
          title: "tabs.settings",
          icon: "gear",
          header: () => <ScreenHeader title="tabs.settings" />,
        }}
      />
    </RootNavigation>
  );
}
