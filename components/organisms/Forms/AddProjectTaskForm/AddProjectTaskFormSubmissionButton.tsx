import { useCreateProjectTaskMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddProjectTaskFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const AddProjectTaskSubmissionButton = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: Parameters<typeof useCreateProjectTaskMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("tasks");
  const addProjectTaskForm = useFormContext<AddProjectTaskFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addProjectTaskMutation = useCreateProjectTaskMutation({
    projectId,
    onSuccess,
  });

  const onSubmit = addProjectTaskForm.handleSubmit((formValues) => {
    const { checklist } = formValues;

    const formattedChecklist = checklist?.reduce(
      (total, { value }) => (value ? [...total, value] : total),
      [] as string[],
    );

    addProjectTaskMutation.mutateAsync({
      ...formValues,
      checklist: formattedChecklist,
      phaseId: formValues.phaseId || null,
      type: "task",
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || addProjectTaskForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("addTask.submit")}
    />
  );
};
