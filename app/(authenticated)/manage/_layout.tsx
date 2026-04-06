import React, { useMemo } from "react";
import { useSegments } from "expo-router";
import { RootNavigation } from "@/components/organisms/Navigation/RootNavigation";

export default function TabLayout() {
  const segments = useSegments();

  const isCompanyView = useMemo(() => segments.includes("company"), [segments]);

  return !isCompanyView ? (
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
  ) : null;
}
