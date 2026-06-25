import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  LocationDataFieldInput,
  ProjectPriorityDataFieldInput,
  ProjectStatusDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { View } from "react-native";
import { Spacing } from "@/styles";

export const AddProjectForm = () => {
  const { t } = useTranslation("projects");
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <ProjectPriorityDataFieldInput name="priority" />
        <ProjectStatusDataFieldInput name="status" />
      </View>

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />

      <LocationDataFieldInput name="location" label={t("address")} />
    </>
  );
};
