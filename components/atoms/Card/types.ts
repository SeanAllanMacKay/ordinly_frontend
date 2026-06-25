import { PropsWithChildren } from "react";
import { type Href } from "expo-router";
import { CompanyPermissionFlag } from "@/api/entities/types";

export type CardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  href?: Href;
  onPress?: () => void;
  headerLeft?: React.ReactElement;
  headerRight?: React.ReactElement;
  actions?: React.ReactElement[];
  emphasis?: "medium" | "high";
  // When set, the card is gated on this RBAC flag: if the current company
  // lacks it, pressing shows the permission-denied modal instead of acting.
  permission?: CompanyPermissionFlag;
  deniedMessage?: string;
}>;

export type CardRenderProps = Omit<
  CardProps,
  "onPress" | "href" | "permission" | "deniedMessage"
>;
