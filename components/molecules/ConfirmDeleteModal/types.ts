export type ConfirmDeleteModalProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
};
