import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";

export default function CompanyLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "Dashboard", icon: "chart-bar-horizontal" }}
      />
      <RootNavigation.Screen
        name="clients"
        options={{ title: "Clients", icon: "blueprint" }}
      />
      <RootNavigation.Screen
        name="projects"
        options={{ title: "Projects", icon: "presentation-chart" }}
      />
      <RootNavigation.Screen
        name="people"
        options={{ title: "People", icon: "identification-card" }}
      />
      <RootNavigation.Screen
        name="settings"
        options={{ title: "Settings", icon: "gear" }}
      />
    </RootNavigation>
  );
}
