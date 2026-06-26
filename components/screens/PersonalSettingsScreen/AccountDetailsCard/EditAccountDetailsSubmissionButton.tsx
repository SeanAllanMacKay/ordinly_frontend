import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, FormLoadingStateContext } from "@/components/atoms";
import {
  useDeleteProfilePictureMutation,
  useGetCurrentUserQuery,
  useUpdateProfilePictureMutation,
} from "@/api";
import { profilePictureToUri } from "@/util/images";
import { EditAccountDetailsFormValues } from "./types";

export const EditAccountDetailsSubmissionButton = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { t } = useTranslation("common");
  const form = useFormContext<EditAccountDetailsFormValues>();
  const formLoadingState = useContext(FormLoadingStateContext);

  const userQuery = useGetCurrentUserQuery();
  const hadPicture = !!profilePictureToUri(userQuery.data?.user?.profilePicture);

  const updatePicture = useUpdateProfilePictureMutation();
  const deletePicture = useDeleteProfilePictureMutation();
  const isSaving = updatePicture.isPending || deletePicture.isPending;

  const onSubmit = form.handleSubmit(async ({ profilePicture }) => {
    try {
      // The profile picture is the only field the backend can persist today; it
      // has its own PUT/DELETE endpoints. Only act when the picture changed.
      if (form.formState.dirtyFields.profilePicture) {
        if (profilePicture) {
          await updatePicture.mutateAsync({ profilePicture });
        } else if (hadPicture) {
          await deletePicture.mutateAsync();
        }
      }

      onSuccess?.();
    } catch {
      // Leave the drawer open so the user can retry.
    }
  });

  return (
    <Button
      mode="contained"
      onPress={onSubmit}
      isDisabled={formLoadingState.isLoading || form.formState.isSubmitting}
      isLoading={isSaving}
      label={t("editAccountDetails.submit")}
    />
  );
};
