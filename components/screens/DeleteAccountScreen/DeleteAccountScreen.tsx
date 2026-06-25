import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Modal, TextInput, Typography } from "@/components";
import { useDeleteUserMutation, useGetCurrentUserQuery } from "@/api";
import { DeleteAccountScreenProps } from "./types";

// Account deletion is irreversible, so we require the user to both retype their
// email (a client-side safeguard) and supply their password, which the backend
// verifies before deleting. On success the mutation clears the query cache,
// which flips the auth gate and redirects to the unauthenticated route group.
export const DeleteAccountScreen = ({ onClose }: DeleteAccountScreenProps) => {
  const { t } = useTranslation("common");
  const userQuery = useGetCurrentUserQuery();
  const email = userQuery.data?.user?.email ?? "";

  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useDeleteUserMutation({ onSuccess: onClose });

  const emailMatches =
    !!email && emailInput.trim().toLowerCase() === email.toLowerCase();
  const canDelete = emailMatches && password.length > 0 && !isPending;

  return (
    <Modal
      title={t("deleteAccount.title")}
      isVisible
      onClose={onClose}
      actions={[
        <Button
          key="cancel"
          variant="secondary"
          mode="outlined"
          label={t("cancel")}
          onPress={onClose}
          isDisabled={isPending}
        />,
        <Button
          key="confirm"
          variant="danger"
          mode="contained"
          icon="remove"
          label={t("settings.deleteAccount")}
          onPress={() => mutate({ password })}
          isLoading={isPending}
          isDisabled={!canDelete}
        />,
      ]}
    >
      <Grid>
        <Typography>{t("deleteAccount.warning")}</Typography>

        <TextInput
          label={t("deleteAccount.confirmEmailLabel")}
          value={emailInput}
          onChange={setEmailInput}
          keyboardType="email-address"
        />

        <TextInput
          label={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
        />
      </Grid>
    </Modal>
  );
};
