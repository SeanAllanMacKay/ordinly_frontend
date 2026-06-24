import React from "react";
import { FloatingActionButton, Screen } from "@/components";
import { CompanyTeamsList } from "@/components/organisms/DataLists/CompanyTeamsList";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyTeamsScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <CompanyTeamsList />

      <FloatingActionButton icon="plus" onPress={() => open("add-team")} />
    </Screen>
  );
};
