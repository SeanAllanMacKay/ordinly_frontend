import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ProjectDetailsScreen } from "@/components/screens";

const ProjectDetails = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  return <ProjectDetailsScreen projectId={projectId} />;
};

export default ProjectDetails;
