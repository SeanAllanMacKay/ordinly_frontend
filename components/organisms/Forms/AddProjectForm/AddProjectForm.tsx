import React from "react";
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
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <ProjectPriorityDataFieldInput name="priority" />
        <ProjectStatusDataFieldInput name="status" />
      </View>

      <EnrichedTextFieldInput name="description" label="Description" />

      <DateFieldInput name="startDate" label="Start date" max={max} />

      <DateFieldInput name="dueDate" label="Due date" min={min} />

      <LocationDataFieldInput name="location" label="Address" />
    </>
  );
};
