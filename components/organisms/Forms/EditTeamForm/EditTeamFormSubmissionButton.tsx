import { useEditTeamMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EditTeamFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditTeamSubmissionButton = ({
  teamId,
  onSuccess,
}: {
  teamId: string;
  onSuccess?: Parameters<typeof useEditTeamMutation>[0]["onSuccess"];
}) => {
  const editTeamForm = useFormContext<EditTeamFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();
  const { t } = useTranslation("companies");

  const editTeamMutation = useEditTeamMutation({ teamId, onSuccess });

  const onSubmit = editTeamForm.handleSubmit((formValues) => {
    editTeamMutation.mutateAsync({
      name: formValues.name,
      description: formValues.description || undefined,
      memberIds: formValues.memberIds ?? [],
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      permission="teams:update"
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        editTeamForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={t("editTeam.submit")}
    />
  );
};
