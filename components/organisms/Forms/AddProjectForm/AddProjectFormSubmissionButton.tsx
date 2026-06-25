import { useCreateProjectMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddProjectFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddProjectSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useCreateProjectMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("projects");
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const addProjectMutation = useCreateProjectMutation({ onSuccess });

  const onSubmit = addProjectForm.handleSubmit((formValues) => {
    addProjectMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addProjectForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("addProject.submit")}
    />
  );
};
