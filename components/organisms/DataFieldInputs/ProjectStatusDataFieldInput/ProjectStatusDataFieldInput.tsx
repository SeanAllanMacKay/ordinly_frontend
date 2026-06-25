import { useGetProjectStatusesQuery } from "@/api";
import { TagFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProjectStatusDataFieldInputProps } from "./types";

export const ProjectStatusDataFieldInput = ({
  name,
  validation,
}: ProjectStatusDataFieldInputProps) => {
  const { t } = useTranslation("projects");
  const projectStatuses = useGetProjectStatusesQuery();

  const defaultValue = projectStatuses?.data?.find(
    ({ label }) => label === "In progress",
  )?.value;

  return (
    <TagFieldInput
      name={name}
      label={t("status")}
      icon="status"
      options={projectStatuses?.data ?? []}
      defaultValue={defaultValue}
      validation={validation}
    />
  );
};
