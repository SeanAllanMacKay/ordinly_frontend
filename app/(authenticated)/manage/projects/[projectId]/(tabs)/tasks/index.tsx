import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { ProjectWorkScreen } from "@/components/screens";

const Work = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();

  return <ProjectWorkScreen projectId={projectId} />;
};

export default Work;
