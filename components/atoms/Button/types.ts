import { ComponentProps, ReactNode } from "react";
import { Button as RNPButton } from "react-native-paper";
import { type IconProps } from "../Icon";
import { Href } from "expo-router";
import { CompanyPermissionFlag } from "@/api/entities/types";

export type ButtonProps = Omit<
  ComponentProps<typeof RNPButton>,
  | "icon"
  | "mode"
  | "children"
  | "style"
  | "dark"
  | "color"
  | "buttonColor"
  | "textColor"
  | "rippleColor"
  | "uppercase"
  | "background"
  | "contentStyle"
  | "maxFontSizeMultiplier"
  | "hitSlop"
  | "labelStyle"
  | "theme"
  | "loading"
  | "disabled"
> & {
  icon?: IconProps["name"];
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSkeleton?: boolean;
  mode?: "text" | "contained" | "contained-tonal" | "outlined";
  variant?: "primary" | "secondary" | "danger";
  href?: Href;
  // When set, the button is gated on this RBAC flag: if the current company
  // lacks it, pressing shows the permission-denied modal instead of acting.
  permission?: CompanyPermissionFlag;
  deniedMessage?: string;
};

export type ButtonRenderProps = Omit<
  ButtonProps,
  "href" | "permission" | "deniedMessage"
>;

export type IconButtonProps = Omit<ButtonRenderProps, "children" | "icon"> & {
  icon: IconProps["name"];
};
