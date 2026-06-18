import React, { useContext } from "react";
import { ProjectDetailsContext } from "./ProjectDetailsProvider";

export const ProjectDetailsProgress = () => {
  const { isLoading, data } = useContext(ProjectDetailsContext);

  const completedTasks = data?.project?.tasks?.filter(() => true);
  const totalTasks = data?.project?.tasks;

  return <></>;
};
