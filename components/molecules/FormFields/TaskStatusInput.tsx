import { useGetTaskStatusesQuery } from "@/api";
import { FormField, TagInput } from "@/components/atoms";
import React, { useState } from "react";
import { TaskStatusInputFieldProps } from "./types";

type TaskStatusType = NonNullable<
  ReturnType<typeof useGetTaskStatusesQuery>["data"]
>[number];

export const TaskStatusInput = ({
  name,
  validation,
}: TaskStatusInputFieldProps) => {
  const taskStatuses = useGetTaskStatusesQuery();

  return (
    <FormField
      name={name}
      label={"Status"}
      validation={validation}
      component={({ value, onChange }) => {
        const [selected, setSelected] = useState<TaskStatusType | undefined>(
          () => {
            return taskStatuses?.data?.find(
              ({ value: statusValue }) => statusValue === value,
            );
          },
        );

        const onSelection = (newValue: TaskStatusType) => {
          setSelected(newValue);
          onChange(newValue.value);
        };

        return (
          <TagInput
            options={taskStatuses?.data ?? []}
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
