import React from "react";
import { FloatingActionButton, Screen } from "@/components";
import { CompanyRolesList } from "@/components/organisms/DataLists/CompanyRolesList";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyRolesScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <CompanyRolesList />

      <FloatingActionButton icon="plus" onPress={() => open("add-role")} />
    </Screen>
  );
};
