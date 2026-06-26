import { useEditClientMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditClientFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditClientSubmissionButton = ({
  clientId,
  onSuccess,
}: {
  clientId: string;
  onSuccess?: Parameters<typeof useEditClientMutation>[0]["onSuccess"];
}) => {
  const { t } = useTranslation("clients");
  const editClientForm = useFormContext<EditClientFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const editClientMutation = useEditClientMutation({ clientId, onSuccess });

  const onSubmit = editClientForm.handleSubmit((formValues) => {
    editClientMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      permission="all_clients:update"
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        editClientForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("editClient.submit")}
    />
  );
};
