import { useGetTaskOptionsQuery } from "@/api";
import { SelectFieldInput } from "@/components/molecules";
import React from "react";
import { TaskDataFieldInputProps } from "./types";

export const TaskDataFieldInput = ({
  name,
  label = "Task",
  validation,
  companyId,
  projectId,
}: TaskDataFieldInputProps) => {
  const options = useGetTaskOptionsQuery({ companyId, projectId });

  return (
    <SelectFieldInput
      name={name}
      label={label}
      options={options.data ?? []}
      validation={validation}
    />
  );
};
