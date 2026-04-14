import { useCreateProjectMutation, useEditProjectMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { EditProjectFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const EditProjectSubmissionButton = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: Parameters<typeof useCreateProjectMutation>[0]["onSuccess"];
}) => {
  const editProjectForm = useFormContext<EditProjectFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const editProjectMutation = useEditProjectMutation({ projectId, onSuccess });

  const onSubmit = editProjectForm.handleSubmit((formValues) => {
    editProjectMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || editProjectForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Save"}
      icon="save"
    />
  );
};
