import { PropsWithChildren, ReactElement } from "react";

export type ConditionalWrapperProps = PropsWithChildren<{
  isWrapped?: boolean;
  wrapper: ReactElement<PropsWithChildren<unknown>>;
}>;
