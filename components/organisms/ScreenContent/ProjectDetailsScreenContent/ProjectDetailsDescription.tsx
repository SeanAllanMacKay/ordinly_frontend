import React, { useContext } from "react";
import { ProjectDetailsContext } from "./ProjectDetailsProvider";
import { EnrichedTypography } from "@/components/atoms";

export const ProjectDetailsDescription = () => {
  const { isLoading, data } = useContext(ProjectDetailsContext);
  const description = data?.project.description;

  return description ? <EnrichedTypography text={description} /> : null;
};
