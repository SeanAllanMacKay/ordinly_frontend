import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { TaskDocumentsScreen } from "@/components/screens";

const ProjectTaskDocuments = () => {
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  return <TaskDocumentsScreen projectId={projectId} taskId={taskId} />;
};

export default ProjectTaskDocuments;
