import React from "react";
import { Button, Modal, Typography } from "@/components";
import { ConfirmDeleteModalProps } from "./types";

// Shared confirmation modal for destructive delete actions. Wraps the Modal
// atom with a Cancel + danger Delete action pair so the per-entity delete
// screens don't duplicate layout. Always rendered visible — mount/unmount is
// driven by ModalHost and the `?modal=` query param.
export const ConfirmDeleteModal = ({
  title,
  message,
  confirmLabel = "Delete",
  isDeleting,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      title={title}
      isVisible
      onClose={onClose}
      actions={[
        <Button
          key="cancel"
          variant="secondary"
          mode="outlined"
          label="Cancel"
          onPress={onClose}
          isDisabled={isDeleting}
        />,
        <Button
          key="confirm"
          variant="danger"
          mode="contained"
          icon="remove"
          label={confirmLabel}
          onPress={onConfirm}
          isLoading={isDeleting}
          isDisabled={isDeleting}
        />,
      ]}
    >
      <Typography>{message}</Typography>
    </Modal>
  );
};
