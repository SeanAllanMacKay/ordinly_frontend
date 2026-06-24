import React from "react";
import { ClientsDataList, FloatingActionButton, Screen } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyClientsScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <ClientsDataList />

      <FloatingActionButton icon="plus" onPress={() => open("add-client")} />
    </Screen>
  );
};
