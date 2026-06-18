import React from "react";
import { ProjectDetailsProvider } from "./ProjectDetailsProvider";
import { ProjectDetailsDescription } from "./ProjectDetailsDescription";
import { ProjectDetailsMap } from "./ProjectDetailsMap";
import { ProjectDetailsProgress } from "./ProjectDetailsProgress";
import { ProjectDetailsMilestones } from "./ProjectDetailsMilestones";
import { ProjectDetailsTags } from "./ProjectDetailsTags";
import { ProjectDetailsDates } from "./ProjectDetailsDates";
import { ScrollView } from "react-native";

export const ProjectDetailsScreenContent = ({
  projectId,
}: {
  projectId: string;
}) => {
  return (
    <ScrollView>
      <ProjectDetailsProvider projectId={projectId}>
        <ProjectDetailsTags />
        <ProjectDetailsDates />
        <ProjectDetailsProgress />
        <ProjectDetailsDescription />
        <ProjectDetailsMap />
        <ProjectDetailsMilestones />
      </ProjectDetailsProvider>
    </ScrollView>
  );
};
