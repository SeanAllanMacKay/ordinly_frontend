import { useGetTaskStatusesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { TaskStatusDataFieldInputProps } from "./types";

export const TaskStatusDataFieldInput = ({
  name,
  validation,
}: TaskStatusDataFieldInputProps) => {
  const taskStatuses = useGetTaskStatusesQuery();

  return (
    <TagFieldInput
      name={name}
      label="Status"
      icon="status"
      options={taskStatuses?.data ?? []}
      validation={validation}
    />
  );
};
