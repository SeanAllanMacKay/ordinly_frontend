import React from "react";
import { FloatingActionButton, Screen } from "@/components";
import { CompanyWorkersList } from "@/components/organisms/DataLists/CompanyWorkersList";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyWorkersScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <CompanyWorkersList />

      <FloatingActionButton icon="plus" onPress={() => open("add-worker")} />
    </Screen>
  );
};
