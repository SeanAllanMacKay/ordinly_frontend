import React from "react";
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

export const AddProjectMilestoneDetailsInputs = () => {
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

      <DateInputField name="dueDate" label="Due date" />

      <TextInputField name="approver" label="Approver" />
    </>
  );
};
