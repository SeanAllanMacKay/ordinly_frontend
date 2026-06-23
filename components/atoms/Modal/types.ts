import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  title?: string;
  isVisible: boolean;
  actions?: React.ReactElement[];
  onClose: () => void;
}>;
