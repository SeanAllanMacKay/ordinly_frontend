import React from "react";
import {
  FloatingActionButton,
  ProjectDetailsScreenContent,
  Screen,
} from "@/components";
import { routes } from "@/constants/routes";
import { ProjectDetailsScreenProps } from "./types";

export const ProjectDetailsScreen = ({
  projectId,
}: ProjectDetailsScreenProps) => {
  return (
    <Screen>
      <ProjectDetailsScreenContent projectId={projectId} />

      <FloatingActionButton
        icon="edit"
        href={routes.manage.projects.editProject(projectId)}
      />
    </Screen>
  );
};
