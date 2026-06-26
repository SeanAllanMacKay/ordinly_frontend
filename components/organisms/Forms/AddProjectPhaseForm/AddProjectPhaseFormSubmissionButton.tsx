import { useCreateProjectPhaseMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddProjectPhaseFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";

export const AddProjectPhaseSubmissionButton = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: Parameters<typeof useCreateProjectPhaseMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("tasks");
  const addProjectPhaseForm = useFormContext<AddProjectPhaseFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addProjectPhaseMutation = useCreateProjectPhaseMutation({
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
      label={t("phase.submit")}
    />
  );
};
