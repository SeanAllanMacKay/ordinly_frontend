import React from "react";
import { TabNavigation } from "@/components";

export default function ClientIdRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="details" options={{ title: "tabs.details" }} />
      <TabNavigation.Screen name="projects" options={{ title: "tabs.projects" }} />
      <TabNavigation.Screen name="contacts" options={{ title: "tabs.contacts" }} />
      <TabNavigation.Screen name="invoices" options={{ title: "tabs.invoices" }} />
      <TabNavigation.Screen name="documents" options={{ title: "tabs.documents" }} />
    </TabNavigation>
  );
}
