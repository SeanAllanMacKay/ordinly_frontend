import React from "react";
import { FloatingActionButton, Screen } from "@/components";
import { ProjectsDataList } from "@/components/organisms/DataLists/ProjectsDataList";
import { useDrawers } from "@/util/navigation/useDrawers";

export const PersonalProjectsScreen = () => {
  const { open } = useDrawers();

  return (
    <Screen>
      <ProjectsDataList />

      <FloatingActionButton icon="plus" onPress={() => open("add-project")} />
    </Screen>
  );
};
