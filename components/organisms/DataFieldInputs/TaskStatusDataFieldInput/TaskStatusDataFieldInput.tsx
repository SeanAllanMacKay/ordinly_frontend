import { useGetTaskStatusesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { TaskStatusDataFieldInputProps } from "./types";

export const TaskStatusDataFieldInput = ({
  name,
  validation,
}: TaskStatusDataFieldInputProps) => {
  const { t } = useTranslation("tasks");
  const taskStatuses = useGetTaskStatusesQuery();

  return (
    <TagFieldInput
      name={name}
      label={t("status")}
      icon="status"
      options={taskStatuses?.data ?? []}
      validation={validation}
    />
  );
};
