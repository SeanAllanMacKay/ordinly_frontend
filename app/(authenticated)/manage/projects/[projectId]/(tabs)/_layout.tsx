import React from "react";
import { TabNavigation } from "@/components";

export default function ProjectIdRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="details" options={{ title: "Details" }} />
      <TabNavigation.Screen name="tasks" options={{ title: "Work" }} />
      <TabNavigation.Screen name="invoices" options={{ title: "Invoices" }} />
      <TabNavigation.Screen name="documents" options={{ title: "Documents" }} />
    </TabNavigation>
  );
}
