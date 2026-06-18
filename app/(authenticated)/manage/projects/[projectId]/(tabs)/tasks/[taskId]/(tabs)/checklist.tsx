import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { TaskChecklistScreen } from "@/components/screens";

const ProjectTaskChecklist = () => {
  const { projectId, taskId } = useGlobalSearchParams<{
    projectId: string;
    taskId: string;
  }>();

  return <TaskChecklistScreen projectId={projectId} taskId={taskId} />;
};

export default ProjectTaskChecklist;
