import { useCreateProjectTaskMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddProjectPhaseFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const AddProjectPhaseSubmissionButton = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: Parameters<typeof useCreateProjectTaskMutation>[0]["onSuccess"];
}) => {
  const addProjectPhaseForm = useFormContext<AddProjectPhaseFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addProjectPhaseMutation = useCreateProjectTaskMutation({
    projectId,
    onSuccess,
  });

  const onSubmit = addProjectPhaseForm.handleSubmit((formValues) => {
    const { checklist } = formValues;

    const formattedChecklist = checklist?.reduce(
      (total, { value }) => (value ? [...total, value] : total),
      [] as string[],
    );

    addProjectPhaseMutation.mutateAsync({
      ...formValues,
      checklist: formattedChecklist,
      type: "phase",
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || addProjectPhaseForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add phase"}
    />
  );
};
