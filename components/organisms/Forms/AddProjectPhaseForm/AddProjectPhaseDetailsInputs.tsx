import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddProjectPhaseFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  TaskPriorityDataFieldInput,
  TaskStatusDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { View } from "react-native";
import { Spacing } from "@/styles";

export const AddProjectPhaseDetailsInputs = () => {
  const { t } = useTranslation("tasks");
  const addProjectPhaseForm = useFormContext<AddProjectPhaseFormFieldTypes>();

  const min = useWatch({
    control: addProjectPhaseForm.control,
    name: "startDate",
  });
  const max = useWatch({
    control: addProjectPhaseForm.control,
    name: "dueDate",
  });

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <TaskPriorityDataFieldInput name="priority" />
        <TaskStatusDataFieldInput name="status" />
      </View>

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />
    </>
  );
};
