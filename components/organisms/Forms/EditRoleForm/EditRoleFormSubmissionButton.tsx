import { useEditRoleMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditRoleFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditRoleSubmissionButton = ({
  roleId,
  onSuccess,
}: {
  roleId: string;
  onSuccess?: Parameters<typeof useEditRoleMutation>[0]["onSuccess"];
}) => {
  const editRoleForm = useFormContext<EditRoleFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();
  const { t } = useTranslation("companies");

  const editRoleMutation = useEditRoleMutation({ roleId, onSuccess });

  const onSubmit = editRoleForm.handleSubmit((formValues) => {
    editRoleMutation.mutateAsync(formValues);
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      permission="roles:update"
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        editRoleForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("editRole.submit")}
    />
  );
};
