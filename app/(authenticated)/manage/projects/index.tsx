import React from "react";
import { Screen } from "@/components";
import { routes } from "@/constants/routes";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";
import { ProjectsDataList } from "@/components/organisms/DataLists/ProjectsDataList";

export default function Projects() {
  return (
    <Screen>
      <ProjectsDataList />

      <FloatingActionButton
        icon="plus"
        label="Add project"
        href={routes.manage.projects.addProject()}
      />
    </Screen>
  );
}
