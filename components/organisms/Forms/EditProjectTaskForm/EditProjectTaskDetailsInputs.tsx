import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  SelectFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import { EditProjectTaskFormFieldTypes } from "./types";

export const EditProjectTaskDetailsInputs = () => {
  const { t } = useTranslation("tasks");
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
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <SelectFieldInput
        name="status"
        label={t("status")}
        options={taskStatuses.data ?? []}
      />

      <SelectFieldInput
        name="priority"
        label={t("priority")}
        options={taskPriorities.data ?? []}
      />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />
    </>
  );
};
