import { useGetProjectPrioritiesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { ProjectPriorityDataFieldInputProps } from "./types";

export const ProjectPriorityDataFieldInput = ({
  name,
  validation,
}: ProjectPriorityDataFieldInputProps) => {
  const projectPriorities = useGetProjectPrioritiesQuery();

  return (
    <TagFieldInput
      name={name}
      label="Priority"
      icon="priority"
      options={projectPriorities?.data ?? []}
      validation={validation}
    />
  );
};
