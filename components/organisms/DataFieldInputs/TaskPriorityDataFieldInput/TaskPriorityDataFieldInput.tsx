import { useGetTaskPrioritiesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { TaskPriorityDataFieldInputProps } from "./types";

export const TaskPriorityDataFieldInput = ({
  name,
  validation,
}: TaskPriorityDataFieldInputProps) => {
  const { t } = useTranslation("tasks");
  const taskPriorities = useGetTaskPrioritiesQuery();

  return (
    <TagFieldInput
      name={name}
      label={t("priority")}
      icon="priority"
      options={taskPriorities?.data ?? []}
      validation={validation}
    />
  );
};
