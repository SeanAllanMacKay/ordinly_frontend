import React from "react";
import { ProjectDetailsProvider } from "./ProjectDetailsProvider";
import { ProjectDetailsDescription } from "./ProjectDetailsDescription";
import { ProjectDetailsMap } from "./ProjectDetailsMap";
import { ProjectDetailsProgress } from "./ProjectDetailsProgress";
import { ProjectDetailsMilestones } from "./ProjectDetailsMilestones";
import { ProjectDetailsTags } from "./ProjectDetailsTags";
import { ProjectDetailsDates } from "./ProjectDetailsDates";
import { ScrollView, View } from "react-native";
import { Button } from "@/components";
import { useModals } from "@/util/navigation/useModals";
import { Spacing } from "@/styles";

export const ProjectDetailsScreenContent = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { open } = useModals();

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

      <View style={{ flexDirection: "row", padding: Spacing.md }}>
        <Button
          variant="danger"
          mode="contained"
          icon="remove"
          label="Delete project"
          onPress={() => open("confirm-delete-project")}
        />
      </View>
    </ScrollView>
  );
};
