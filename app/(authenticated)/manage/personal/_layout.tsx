import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";
import { ScreenHeader } from "@/components";

export default function PersonalLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "tabs.home", icon: "home" }}
      />

      <RootNavigation.Screen
        name="clients"
        options={{
          title: "tabs.clients",
          icon: "blueprint",
        }}
      />

      <RootNavigation.Screen
        name="projects"
        options={{
          title: "tabs.projects",
          icon: "projects",
        }}
      />

      <RootNavigation.Screen
        name="account"
        options={{
          title: "tabs.account",
          icon: "account",
          header: () => <ScreenHeader title="tabs.account" />,
        }}
      />
    </RootNavigation>
  );
}
