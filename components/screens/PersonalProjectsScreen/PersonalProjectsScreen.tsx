import React from "react";
import { FloatingActionButton, Screen } from "@/components";
import { ProjectsDataList } from "@/components/organisms/DataLists/ProjectsDataList";
import { routes } from "@/constants/routes";

export const PersonalProjectsScreen = () => {
  return (
    <Screen>
      <ProjectsDataList />

      <FloatingActionButton
        icon="plus"
        href={routes.manage.projects.addProject()}
      />
    </Screen>
  );
};
