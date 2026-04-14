import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { requiredValidator } from "@/util/validation";
import {
  DateInputField,
  EnrichedTextInputField,
  SelectInputField,
  TextInputField,
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
      <TextInputField
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <EnrichedTextInputField name="description" label="Description" />

      <SelectInputField
        name="status"
        label="Status"
        options={taskStatuses.data ?? []}
      />

      <SelectInputField
        name="priority"
        label="Priority"
        options={taskPriorities.data ?? []}
      />

      <DateInputField name="startDate" label="Start date" max={max} />

      <DateInputField name="dueDate" label="Due date" min={min} />
    </>
  );
};
