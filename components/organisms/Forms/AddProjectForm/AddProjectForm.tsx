import {
  useGetProjectPrioritiesQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import { DateInput, FormField, Select, TextInput } from "@/components/atoms";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";

export const AddProjectForm = () => {
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

  return (
    <>
      <FormField
        name="name"
        label="Name"
        component={TextInput}
        validation={{ requiredValidator }}
      />
      <FormField name="description" label="Description" component={TextInput} />
      <FormField
        name="status"
        label="Status"
        component={(fieldProps) => (
          <Select {...fieldProps} options={projectStatuses.data ?? []} />
        )}
      />
      <FormField
        name="priority"
        label="Priority"
        component={(fieldProps) => (
          <Select {...fieldProps} options={projectPriorities.data ?? []} />
        )}
      />
      <FormField
        name="startDate"
        label="Start date"
        component={(fieldProps) => <DateInput {...fieldProps} max={max} />}
      />
      <FormField
        name="dueDate"
        label="Due date"
        component={(fieldProps) => <DateInput {...fieldProps} min={min} />}
      />
    </>
  );
};
