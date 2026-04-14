import {
  useGetProjectPrioritiesQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateInputField,
  EnrichedTextInputField,
  SelectInputField,
  TextInputField,
} from "@/components/molecules";

export const AddProjectForm = () => {
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

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
        options={projectStatuses.data ?? []}
      />

      <SelectInputField
        name="priority"
        label="Priority"
        options={projectPriorities.data ?? []}
      />

      <DateInputField name="startDate" label="Start date" max={max} />

      <DateInputField name="dueDate" label="Due date" min={min} />
    </>
  );
};
