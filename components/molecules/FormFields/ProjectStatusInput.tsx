import { useGetProjectStatusesQuery } from "@/api";
import { FormField, TagInput } from "@/components/atoms";
import React, { useState } from "react";
import { ProjectStatusInputFieldProps } from "./types";

type ProjectStatusType = NonNullable<
  ReturnType<typeof useGetProjectStatusesQuery>["data"]
>[number];

export const ProjectStatusInput = ({
  name,
  validation,
}: ProjectStatusInputFieldProps) => {
  const projectStatuses = useGetProjectStatusesQuery();

  return (
    <FormField
      name={name}
      label={"Status"}
      validation={validation}
      component={({ value, onChange }) => {
        const [selected, setSelected] = useState<ProjectStatusType | undefined>(
          () => {
            return projectStatuses?.data?.find(
              ({ value: statusValue }) => statusValue === value,
            );
          },
        );

        const onSelection = (newValue: ProjectStatusType) => {
          setSelected(newValue);
          onChange(newValue.value);
        };

        return (
          <TagInput
            options={projectStatuses?.data ?? []}
            value={selected}
            onChange={onSelection}
            label="Status"
            icon="status"
          />
        );
      }}
    />
  );
};
