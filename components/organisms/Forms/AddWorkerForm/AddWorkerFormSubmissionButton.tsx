import { useInviteWorkerMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddWorkerFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddWorkerSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useInviteWorkerMutation>[0]["onSuccess"];
}) => {
  const addWorkerForm = useFormContext<AddWorkerFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();
  const { t } = useTranslation("companies");

  const inviteWorkerMutation = useInviteWorkerMutation({ onSuccess });

  const onSubmit = addWorkerForm.handleSubmit((formValues) => {
    inviteWorkerMutation.mutateAsync({
      email: formValues.email,
      roleId: formValues.roleId,
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addWorkerForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("addWorker.submit")}
    />
  );
};
