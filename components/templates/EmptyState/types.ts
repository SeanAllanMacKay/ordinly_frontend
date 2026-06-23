import { ReactElement } from "react";
import { IconNameType } from "@/components/atoms/Icon/types";

export type EmptyStateProps = {
  icon: IconNameType;
  title: string;
  subtitle?: string;
  actions?: ReactElement[];
};
