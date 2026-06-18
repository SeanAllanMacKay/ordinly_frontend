import { useCreateProjectMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const AddProjectSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useCreateProjectMutation>[0]["onSuccess"];
}) => {
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addProjectMutation = useCreateProjectMutation({ onSuccess });

  const onSubmit = addProjectForm.handleSubmit((formValues) => {
    addProjectMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || addProjectForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add project"}
    />
  );
};
