import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import { DateInput, FormField, Select, TextInput } from "@/components/atoms";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectTaskFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateInputField,
  EnrichedTextInputField,
  SelectInputField,
  TextInputField,
} from "@/components/molecules";

export const AddProjectTaskDetailsInputs = () => {
  const addProjectTaskForm = useFormContext<AddProjectTaskFormFieldTypes>();
  const taskStatuses = useGetTaskStatusesQuery();
  const taskPriorities = useGetTaskPrioritiesQuery();

  const min = useWatch({
    control: addProjectTaskForm.control,
    name: "startDate",
  });
  const max = useWatch({
    control: addProjectTaskForm.control,
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
