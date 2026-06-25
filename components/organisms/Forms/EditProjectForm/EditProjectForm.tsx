import {
  useGetProjectPrioritiesQuery,
  useGetProjectQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("projects");
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
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <SelectFieldInput
        name="status"
        label={t("status")}
        options={projectStatuses.data ?? []}
      />

      <SelectFieldInput
        name="priority"
        label={t("priority")}
        options={projectPriorities.data ?? []}
      />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />

      <LocationDataFieldInput
        name="location"
        label={t("address")}
        defaultDisplayValue={
          storedLocation
            ? formatLocationDisplayValue(mapFeatureToLocationValue(storedLocation))
            : undefined
        }
      />
    </>
  );
};
