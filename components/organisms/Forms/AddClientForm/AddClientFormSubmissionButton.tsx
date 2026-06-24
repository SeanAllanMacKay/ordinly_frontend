import { useCreateClientMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddClientFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddClientSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useCreateClientMutation>[0]["onSuccess"];
}) => {
  const addClientForm = useFormContext<AddClientFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const addClientMutation = useCreateClientMutation({ onSuccess });

  const onSubmit = addClientForm.handleSubmit((formValues) => {
    addClientMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addClientForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add client"}
    />
  );
};
