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
  AddressInput,
  DateInputField,
  EnrichedTextInputField,
  formatAddressDisplayValue,
  SelectInputField,
  TextInputField,
} from "@/components/molecules";

export const EditProjectForm = ({ projectId }: { projectId: string }) => {
  const editProjectForm = useFormContext<EditProjectFormFieldTypes>();
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();
  const projectQuery = useGetProjectQuery({ projectId });

  const min = useWatch({ control: editProjectForm.control, name: "startDate" });
  const max = useWatch({ control: editProjectForm.control, name: "dueDate" });

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

      <AddressInput
        name="location"
        label="Address"
        defaultDisplayValue={formatAddressDisplayValue({
          country:
            projectQuery?.data?.project?.locations?.[0]?.context?.country
              .name ??
            (projectQuery?.data?.project?.locations?.[0]?.feature_type ===
            "country"
              ? name
              : undefined),
          region:
            projectQuery?.data?.project?.locations?.[0]?.context?.region
              ?.name ??
            (projectQuery?.data?.project?.locations?.[0]?.feature_type ===
            "region"
              ? name
              : undefined),
          city:
            projectQuery?.data?.project?.locations?.[0]?.context?.place?.name ??
            (projectQuery?.data?.project?.locations?.[0]?.feature_type ===
            "place"
              ? name
              : undefined),
          postalCode:
            projectQuery?.data?.project?.locations?.[0]?.context?.postcode
              ?.name ??
            (projectQuery?.data?.project?.locations?.[0]?.eature_type ===
            "postcode"
              ? name
              : undefined),
          address:
            projectQuery?.data?.project?.locations?.[0]?.context?.address?.name,
        })}
      />
    </>
  );
};
