import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";
import { ScreenHeader } from "@/components";

export default function PersonalLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "Home", icon: "home" }}
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
        name="clients"
        options={{
          title: "Clients",
          icon: "blueprint",
          header: () => <ScreenHeader title="Clients" />,
        }}
      />

      <RootNavigation.Screen
        name="account"
        options={{
          title: "Account",
          icon: "account",
          header: () => <ScreenHeader title="Account" />,
        }}
      />
    </RootNavigation>
  );
}
