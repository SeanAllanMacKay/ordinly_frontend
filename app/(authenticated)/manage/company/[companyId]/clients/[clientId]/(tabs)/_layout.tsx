import React from "react";
import { TabNavigation } from "@/components";

export default function ClientIdRouter() {
  return (
    <TabNavigation>
      <TabNavigation.Screen name="details" options={{ title: "Details" }} />
      <TabNavigation.Screen name="projects" options={{ title: "Projects" }} />
      <TabNavigation.Screen name="contacts" options={{ title: "Contacts" }} />
      <TabNavigation.Screen name="invoices" options={{ title: "Invoices" }} />
      <TabNavigation.Screen name="documents" options={{ title: "Documents" }} />
    </TabNavigation>
  );
}
