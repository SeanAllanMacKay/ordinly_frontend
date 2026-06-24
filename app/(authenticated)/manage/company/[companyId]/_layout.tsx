import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";
import { ScreenHeader } from "@/components";

export default function CompanyLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "Dashboard", icon: "chart-bar-horizontal" }}
      />
      <RootNavigation.Screen
        name="clients"
        options={{
          title: "Clients",
          icon: "blueprint",
          header: () => <ScreenHeader title="Clients" />,
        }}
      />
      <RootNavigation.Screen
        name="projects"
        options={{
          title: "Projects",
          icon: "projects",
          header: () => <ScreenHeader title="Projects" />,
        }}
      />
      <RootNavigation.Screen
        name="people"
        options={{
          title: "People",
          icon: "identification-card",
          header: () => <ScreenHeader title="People" />,
        }}
      />
      <RootNavigation.Screen
        name="settings"
        options={{
          title: "Settings",
          icon: "gear",
          header: () => <ScreenHeader title="Settings" />,
        }}
      />
    </RootNavigation>
  );
}
