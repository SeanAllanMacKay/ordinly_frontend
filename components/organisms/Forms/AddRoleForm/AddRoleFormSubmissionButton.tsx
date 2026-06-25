import { useCreateRoleMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddRoleFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddRoleSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useCreateRoleMutation>[0]["onSuccess"];
}) => {
  const addRoleForm = useFormContext<AddRoleFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();
  const { t } = useTranslation("companies");

  const addRoleMutation = useCreateRoleMutation({ onSuccess });

  const onSubmit = addRoleForm.handleSubmit((formValues) => {
    addRoleMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addRoleForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("addRole.submit")}
    />
  );
};
