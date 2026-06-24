import { useCreateProjectTaskMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddProjectMilestoneFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const AddProjectMilestoneSubmissionButton = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: Parameters<typeof useCreateProjectTaskMutation>[0]["onSuccess"];
}) => {
  const addProjectTaskForm =
    useFormContext<AddProjectMilestoneFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addProjectTaskMutation = useCreateProjectTaskMutation({
    projectId,
    onSuccess,
  });

  const onSubmit = addProjectTaskForm.handleSubmit((formValues) => {
    addProjectTaskMutation.mutateAsync({ ...formValues, type: "milestone" });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || addProjectTaskForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add milestone"}
    />
  );
};
