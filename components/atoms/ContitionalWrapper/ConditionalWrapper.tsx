import { cloneElement, type PropsWithChildren, type ReactElement } from "react";
import { ConditionalWrapperProps } from "./types";

export const ConditionalWrapper = ({
  isWrapped,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return isWrapped && !!wrapper
    ? cloneElement(wrapper, { children })
    : children;
};
