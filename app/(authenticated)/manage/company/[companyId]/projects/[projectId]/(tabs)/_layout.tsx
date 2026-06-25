import React from "react";
import { TabNavigation } from "@/components";

export default function ProjectIdRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="details" options={{ title: "tabs.details" }} />
      <TabNavigation.Screen name="tasks" options={{ title: "tabs.work" }} />
      <TabNavigation.Screen name="invoices" options={{ title: "tabs.invoices" }} />
      <TabNavigation.Screen name="documents" options={{ title: "tabs.documents" }} />
    </TabNavigation>
  );
}
