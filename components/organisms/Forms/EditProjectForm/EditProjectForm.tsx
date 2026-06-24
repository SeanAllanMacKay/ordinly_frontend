import {
  useGetProjectPrioritiesQuery,
  useGetProjectQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { EditProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  SelectFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  LocationDataFieldInput,
  formatLocationDisplayValue,
  mapFeatureToLocationValue,
} from "@/components/organisms/DataFieldInputs";

export const EditProjectForm = ({ projectId }: { projectId: string }) => {
  const editProjectForm = useFormContext<EditProjectFormFieldTypes>();
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();
  const projectQuery = useGetProjectQuery({ projectId });

  const min = useWatch({ control: editProjectForm.control, name: "startDate" });
  const max = useWatch({ control: editProjectForm.control, name: "dueDate" });

  const storedLocation = projectQuery?.data?.project?.locations?.[0];

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
        options={projectStatuses.data ?? []}
      />

      <SelectFieldInput
        name="priority"
        label="Priority"
        options={projectPriorities.data ?? []}
      />

      <DateFieldInput name="startDate" label="Start date" max={max} />

      <DateFieldInput name="dueDate" label="Due date" min={min} />

      <LocationDataFieldInput
        name="location"
        label="Address"
        defaultDisplayValue={
          storedLocation
            ? formatLocationDisplayValue(mapFeatureToLocationValue(storedLocation))
            : undefined
        }
      />
    </>
  );
};
