import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  SelectFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import { EditProjectTaskFormFieldTypes } from "./types";

export const EditProjectTaskDetailsInputs = () => {
  const editProjectTaskForm = useFormContext<EditProjectTaskFormFieldTypes>();
  const taskStatuses = useGetTaskStatusesQuery();
  const taskPriorities = useGetTaskPrioritiesQuery();

  const min = useWatch({
    control: editProjectTaskForm.control,
    name: "startDate",
  });
  const max = useWatch({
    control: editProjectTaskForm.control,
    name: "dueDate",
  });

  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label="Description" />

      <SelectFieldInput
        name="status"
        label="Status"
        options={taskStatuses.data ?? []}
      />

      <SelectFieldInput
        name="priority"
        label="Priority"
        options={taskPriorities.data ?? []}
      />

      <DateFieldInput name="startDate" label="Start date" max={max} />

      <DateFieldInput name="dueDate" label="Due date" min={min} />
    </>
  );
};
