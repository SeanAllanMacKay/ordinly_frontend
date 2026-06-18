import { useGetTaskPrioritiesQuery } from "@/api";
import { FormField, TagInput } from "@/components/atoms";
import React, { useState } from "react";
import { TaskPriorityInputFieldProps } from "./types";

type TaskPriorityType = NonNullable<
  ReturnType<typeof useGetTaskPrioritiesQuery>["data"]
>[number];

export const TaskPriorityInput = ({
  name,
  validation,
}: TaskPriorityInputFieldProps) => {
  const taskPriorities = useGetTaskPrioritiesQuery();

  return (
    <FormField
      name={name}
      label={"Priority"}
      validation={validation}
      component={({ value, onChange }) => {
        const [selected, setSelected] = useState<TaskPriorityType | undefined>(
          () => {
            return taskPriorities?.data?.find(
              ({ value: priorityValue }) => priorityValue === value,
            );
          },
        );

        const onSelection = (newValue: TaskPriorityType) => {
          setSelected(newValue);
          onChange(newValue.value);
        };

        return (
          <TagInput
            options={taskPriorities?.data ?? []}
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
