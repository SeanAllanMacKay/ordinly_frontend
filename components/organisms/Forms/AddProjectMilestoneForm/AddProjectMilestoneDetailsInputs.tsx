import React from "react";
import { useTranslation } from "react-i18next";
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

export const AddProjectMilestoneDetailsInputs = () => {
  const { t } = useTranslation("tasks");

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

      <DateFieldInput name="dueDate" label={t("dueDate")} />

      <TextFieldInput name="approver" label={t("milestone.approver")} />
    </>
  );
};
