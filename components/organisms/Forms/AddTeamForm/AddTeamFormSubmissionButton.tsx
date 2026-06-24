import { useCreateTeamMutation } from "@/api";
import { useFormContext } from "react-hook-form";
import { AddTeamFormFieldTypes } from "./types";
import React, { useContext } from "react";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddTeamSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: Parameters<typeof useCreateTeamMutation>[0]["onSuccess"];
}) => {
  const addTeamForm = useFormContext<AddTeamFormFieldTypes>();
  const formLoadingState = useContext(FormLoadingStateContext);
  const companyId = useActiveCompanyId();

  const addTeamMutation = useCreateTeamMutation({ onSuccess });

  const onSubmit = addTeamForm.handleSubmit((formValues) => {
    addTeamMutation.mutateAsync({
      name: formValues.name,
      description: formValues.description || undefined,
      memberIds: formValues.memberIds ?? [],
    });
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={
        !companyId ||
        formLoadingState.isLoading ||
        addTeamForm.formState.isSubmitting
      }
      isLoading={formLoadingState.isLoading}
      label={"Add team"}
    />
  );
};
