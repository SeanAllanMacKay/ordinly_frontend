import React from "react";
import { TabNavigation } from "@/components";

export default function PeopleRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="roles" options={{ title: "Roles" }} />
      <TabNavigation.Screen name="teams" options={{ title: "Teams" }} />
      <TabNavigation.Screen name="workers" options={{ title: "Workers" }} />
    </TabNavigation>
  );
}
