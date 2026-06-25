import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditProjectTaskFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useEditProjectTaskMutation } from "@/api/entities/projects/mutations/useEditProjectTaskMutation";

export const EditProjectTaskSubmissionButton = ({
  projectId,
  taskId,
  onSuccess,
}: {
  projectId: string;
  taskId: string;
  onSuccess?: Parameters<typeof useEditProjectTaskMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("tasks");
  const editProjectTaskForm = useFormContext<EditProjectTaskFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const editrojectTaskMutation = useEditProjectTaskMutation({
    projectId,
    taskId,
    onSuccess,
  });

  const onSubmit = editProjectTaskForm.handleSubmit((formValues) => {
    editrojectTaskMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || editProjectTaskForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("save")}
      icon="save"
    />
  );
};
