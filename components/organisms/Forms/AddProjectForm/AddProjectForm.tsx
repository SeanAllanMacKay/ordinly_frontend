import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  AddressInput,
  DateInputField,
  EnrichedTextInputField,
  ProjectStatusInput,
  TextInputField,
} from "@/components/molecules";
import { ProjectPriorityInput } from "@/components/molecules/FormFields/ProjectPriorityInput";
import { View } from "react-native";
import { Spacing } from "@/styles";

export const AddProjectForm = () => {
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

  return (
    <>
      <TextInputField
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <ProjectPriorityInput name="priority" />
        <ProjectStatusInput name="status" />
      </View>

      <EnrichedTextInputField name="description" label="Description" />

      <DateInputField name="startDate" label="Start date" max={max} />

      <DateInputField name="dueDate" label="Due date" min={min} />

      <AddressInput name="location" label="Address" />
    </>
  );
};
