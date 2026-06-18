import { PropsWithChildren, ReactElement } from "react";

export type AccordionProps = PropsWithChildren<{
  defaultOpenSections?: string[];
}>;

export type AccordionItemProps = PropsWithChildren<{
  id: string;
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
}>;
