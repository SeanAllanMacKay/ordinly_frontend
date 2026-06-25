import { useGetProjectPrioritiesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProjectPriorityDataFieldInputProps } from "./types";

export const ProjectPriorityDataFieldInput = ({
  name,
  validation,
}: ProjectPriorityDataFieldInputProps) => {
  const { t } = useTranslation("projects");
  const projectPriorities = useGetProjectPrioritiesQuery();

  return (
    <TagFieldInput
      name={name}
      label={t("priority")}
      icon="priority"
      options={projectPriorities?.data ?? []}
      validation={validation}
    />
  );
};
