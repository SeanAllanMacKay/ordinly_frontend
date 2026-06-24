import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectTaskFormFieldTypes } from "./types";
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

export const AddProjectTaskDetailsInputs = () => {
  const addProjectTaskForm = useFormContext<AddProjectTaskFormFieldTypes>();

  const min = useWatch({
    control: addProjectTaskForm.control,
    name: "startDate",
  });
  const max = useWatch({
    control: addProjectTaskForm.control,
    name: "dueDate",
  });

  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <TaskPriorityDataFieldInput name="priority" />
        <TaskStatusDataFieldInput name="status" />
      </View>

      <EnrichedTextFieldInput name="description" label="Description" />

      <DateFieldInput name="startDate" label="Start date" max={max} />

      <DateFieldInput name="dueDate" label="Due date" min={min} />
    </>
  );
};
