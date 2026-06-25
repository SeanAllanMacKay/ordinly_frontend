import React from "react";
import { TabNavigation } from "@/components";

export default function PeopleRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="workers" options={{ title: "tabs.workers" }} />
      <TabNavigation.Screen name="teams" options={{ title: "tabs.teams" }} />
      <TabNavigation.Screen name="roles" options={{ title: "tabs.roles" }} />
    </TabNavigation>
  );
}
