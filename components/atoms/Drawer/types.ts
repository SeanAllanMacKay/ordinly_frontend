import { PropsWithChildren } from "react";

export type DrawerProps = PropsWithChildren<{
  title?: string | React.ReactElement;
  isVisible: boolean;
  actions?: React.ReactElement[];
  onClose: () => void;
}>;
