import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Modal, TextInput, Typography } from "@/components";
import { ChangePasswordScreenProps } from "./types";

// Stub: the backend does not yet expose a change-password endpoint, so the
// fields render for layout/UX preview but the submit stays disabled. Wire it to
// a mutation once the endpoint exists (mirror DeleteAccountScreen's flow).
export const ChangePasswordScreen = ({
  onClose,
}: ChangePasswordScreenProps) => {
  const { t } = useTranslation("common");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Modal
      title={t("changePassword.title")}
      isVisible
      onClose={onClose}
      actions={[
        <Button
          key="cancel"
          variant="secondary"
          mode="outlined"
          label={t("cancel")}
          onPress={onClose}
        />,
        <Button
          key="confirm"
          variant="primary"
          mode="contained"
          label={t("changePassword.submit")}
          // No backend yet — keep submit inert.
          isDisabled
        />,
      ]}
    >
      <Grid>
        <Typography color="onSurfaceVariant">
          {t("changePassword.comingSoon")}
        </Typography>

        <TextInput
          label={t("changePassword.currentPassword")}
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />

        <TextInput
          label={t("changePassword.newPassword")}
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />

        <TextInput
          label={t("changePassword.confirmPassword")}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </Grid>
    </Modal>
  );
};
