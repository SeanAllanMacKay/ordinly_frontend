import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Typography } from "@/components";
import { DEFAULT_DENIED_MESSAGE } from "@/util/permissions/usePermissionGate";
import { PermissionDeniedScreenProps } from "./types";

// Shared informational modal explaining why an action is unavailable. Mounted
// via ModalHost and the `?modal=permission-denied` query param; the message
// rides along in the `deniedMessage` param. Single dismiss action — there is
// nothing to confirm.
export const PermissionDeniedScreen = ({
  message,
  onClose,
}: PermissionDeniedScreenProps) => {
  const { t } = useTranslation("common");

  return (
    <Modal
      title={t("permissionDenied.title")}
      isVisible
      onClose={onClose}
      actions={[
        <Button
          key="ok"
          variant="primary"
          mode="contained"
          label={t("permissionDenied.gotIt")}
          onPress={onClose}
        />,
      ]}
    >
      <Typography>{message ?? DEFAULT_DENIED_MESSAGE}</Typography>
    </Modal>
  );
};
