import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectPhaseFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateInputField,
  EnrichedTextInputField,
  TaskPriorityInput,
  TaskStatusInput,
  TextInputField,
} from "@/components/molecules";
import { View } from "react-native";
import { Spacing } from "@/styles";

export const AddProjectPhaseDetailsInputs = () => {
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
      <TextInputField
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <TaskPriorityInput name="priority" />
        <TaskStatusInput name="status" />
      </View>

      <EnrichedTextInputField name="description" label="Description" />

      <DateInputField name="startDate" label="Start date" max={max} />

      <DateInputField name="dueDate" label="Due date" min={min} />
    </>
  );
};
