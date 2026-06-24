import React from "react";
import {
  FloatingActionButton,
  ProjectDetailsScreenContent,
  Screen,
} from "@/components";
import { useProjectRoutes } from "@/util/navigation/useProjectRoutes";
import { ProjectDetailsScreenProps } from "./types";

export const ProjectDetailsScreen = ({
  projectId,
}: ProjectDetailsScreenProps) => {
  const projectRoutes = useProjectRoutes();

  return (
    <Screen>
      <ProjectDetailsScreenContent projectId={projectId} />

      <FloatingActionButton
        icon="edit"
        href={projectRoutes.editProject(projectId)}
      />
    </Screen>
  );
};
