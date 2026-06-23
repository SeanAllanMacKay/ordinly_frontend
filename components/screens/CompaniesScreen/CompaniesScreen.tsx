import React from "react";
import { CompaniesDataList, FloatingActionButton, Screen } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompaniesScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <CompaniesDataList />

      <FloatingActionButton icon="plus" onPress={() => open("add-company")} />
    </Screen>
  );
};
