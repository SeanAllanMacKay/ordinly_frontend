import { useGetTaskPrioritiesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { TaskPriorityDataFieldInputProps } from "./types";

export const TaskPriorityDataFieldInput = ({
  name,
  validation,
}: TaskPriorityDataFieldInputProps) => {
  const taskPriorities = useGetTaskPrioritiesQuery();

  return (
    <TagFieldInput
      name={name}
      label="Priority"
      icon="priority"
      options={taskPriorities?.data ?? []}
      validation={validation}
    />
  );
};
