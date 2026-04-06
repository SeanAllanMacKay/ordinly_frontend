import { useCreateProjectTaskMutation } from "@/api";
import { useFormContext } from "react-hook-form";
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
      label={"Add task"}
      icon="plus"
    />
  );
};
