import { useFormContext } from "react-hook-form";
import { AddCompanyFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useCreateCompanyMutation } from "@/api/entities/companies/mutations";
import { routes } from "@/constants/routes";

export const AddCompanySubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: NonNullable<
    Parameters<typeof useCreateCompanyMutation>[0]
  >["onSuccess"];
}) => {
  const addCompanyForm = useFormContext<AddCompanyFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const router = useRouter();

  const addCompanyMutation = useCreateCompanyMutation({
    onSuccess: (data) => {
      onSuccess?.(data);

      router.push(routes.manage.company.root(data.company.id));
    },
  });

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
