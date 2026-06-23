import React from "react";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";

export default function PersonalLayout() {
  return (
    <RootNavigation>
      <RootNavigation.Screen
        name="index"
        options={{ title: "Home", icon: "home" }}
      />
      <RootNavigation.Screen
        name="projects"
        options={{ title: "Projects", icon: "projects" }}
      />
      <RootNavigation.Screen
        name="companies"
        options={{ title: "Companies", icon: "companies" }}
      />
      <RootNavigation.Screen
        name="account"
        options={{ title: "Account", icon: "account" }}
      />
    </RootNavigation>
  );
}
