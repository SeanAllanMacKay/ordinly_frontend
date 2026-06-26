import { useGetWorkerQuery, useUpdateWorkerRolesMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditWorkerFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditWorkerSubmissionButton = ({
  workerId,
  onSuccess,
}: {
  workerId: string;
  onSuccess?: Parameters<typeof useUpdateWorkerRolesMutation>[0]["onSuccess"];
}) => {
  const editWorkerForm = useFormContext<EditWorkerFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();
  const { t } = useTranslation("companies");

  // The update endpoint needs the membership row id (distinct from the userId
  // in the path); read it from the cached worker query.
  const workerQuery = useGetWorkerQuery({ userId: workerId });
  const memberId = workerQuery.data?.member.id;

  const updateWorkerRolesMutation = useUpdateWorkerRolesMutation({
    userId: workerId,
    onSuccess,
  });

  const onSubmit = editWorkerForm.handleSubmit((formValues) => {
    if (!memberId) {
      return;
    }

    updateWorkerRolesMutation.mutateAsync({
      memberId,
      roleIds: formValues.roleIds ?? [],
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      permission="workers:update"
      isDisabled={
        !companyId ||
        !memberId ||
        formLoadingState.isLoading ||
        editWorkerForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("editWorker.submit")}
    />
  );
};
