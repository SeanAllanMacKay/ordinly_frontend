import { useFormContext } from "react-hook-form";
import { AddCompanyFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useCreateCompanyMutation } from "@/api/entities/companies/mutations";

export const AddCompanySubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: NonNullable<
    Parameters<typeof useCreateCompanyMutation>[0]
  >["onSuccess"];
}) => {
  const addCompanyForm = useFormContext<AddCompanyFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const addCompanyMutation = useCreateCompanyMutation({ onSuccess });

  const onSubmit = addCompanyForm.handleSubmit((formValues) => {
    addCompanyMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        formLoadingState.isLoading || addCompanyForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add company"}
      icon="plus"
    />
  );
};
