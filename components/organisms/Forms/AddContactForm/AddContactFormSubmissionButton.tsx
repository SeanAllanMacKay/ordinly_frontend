import { useCreateClientContactMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddContactFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddContactSubmissionButton = ({
  clientId,
  onSuccess,
}: {
  clientId: string;
  onSuccess?: Parameters<typeof useCreateClientContactMutation>[0]["onSuccess"];
}) => {
  const addContactForm = useFormContext<AddContactFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const addContactMutation = useCreateClientContactMutation({
    clientId,
    onSuccess,
  });

  const onSubmit = addContactForm.handleSubmit((formValues) => {
    addContactMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addContactForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add contact"}
    />
  );
};
