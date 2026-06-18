import { useGetProjectPrioritiesQuery } from "@/api";
import { FormField, TagInput } from "@/components/atoms";
import React, { useState } from "react";
import { ProjectPriorityInputFieldProps } from "./types";

type ProjectPriorityType = NonNullable<
  ReturnType<typeof useGetProjectPrioritiesQuery>["data"]
>[number];

export const ProjectPriorityInput = ({
  name,
  validation,
}: ProjectPriorityInputFieldProps) => {
  const projectPriorities = useGetProjectPrioritiesQuery();

  return (
    <FormField
      name={name}
      label={"Priority"}
      validation={validation}
      component={({ value, onChange }) => {
        const [selected, setSelected] = useState<
          ProjectPriorityType | undefined
        >(() => {
          return projectPriorities?.data?.find(
            ({ value: priorityValue }) => priorityValue === value,
          );
        });

        const onSelection = (newValue: ProjectPriorityType) => {
          setSelected(newValue);
          onChange(newValue.value);
        };

        return (
          <TagInput
            options={projectPriorities?.data ?? []}
            value={selected}
            onChange={onSelection}
            label="Priority"
            icon="priority"
          />
        );
      }}
    />
  );
};
