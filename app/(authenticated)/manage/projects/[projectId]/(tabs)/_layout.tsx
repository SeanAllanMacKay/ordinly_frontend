import React from "react";

import { TopTabNavigation } from "@/components/organisms/Navigation";

export default function ProjectIdRouter() {
  return (
    <TopTabNavigation>
      <TopTabNavigation.Screen name="index" title="Overview" />
      <TopTabNavigation.Screen name="tasks" title="Tasks" />
      <TopTabNavigation.Screen name="invoices" title="Invoices" />
      <TopTabNavigation.Screen name="documents" title="Documents" />
    </TopTabNavigation>
  );
}
