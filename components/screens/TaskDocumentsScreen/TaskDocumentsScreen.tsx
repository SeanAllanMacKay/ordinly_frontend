import React from "react";
import { ProjectTaskDocumentsScreenContent, Screen } from "@/components";
import { TaskDocumentsScreenProps } from "./types";

export const TaskDocumentsScreen = ({
  projectId,
  taskId,
}: TaskDocumentsScreenProps) => {
  return (
    <Screen>
      <ProjectTaskDocumentsScreenContent projectId={projectId} taskId={taskId} />
    </Screen>
  );
};
