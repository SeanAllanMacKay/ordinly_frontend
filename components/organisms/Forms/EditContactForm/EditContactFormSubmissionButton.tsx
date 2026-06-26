import { useEditClientContactMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditContactFormFieldTypes } from "./types";
import { toContactInput } from "../AddContactForm";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditContactSubmissionButton = ({
  clientId,
  contactId,
  onSuccess,
}: {
  clientId: string;
  contactId: string;
  onSuccess?: Parameters<typeof useEditClientContactMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("clients");
  const editContactForm = useFormContext<EditContactFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const editContactMutation = useEditClientContactMutation({
    clientId,
    contactId,
    onSuccess,
  });

  const onSubmit = editContactForm.handleSubmit((formValues) => {
    editContactMutation.mutateAsync(toContactInput(formValues));
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      permission="all_clients:update"
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        editContactForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("editContact.submit")}
    />
  );
};
