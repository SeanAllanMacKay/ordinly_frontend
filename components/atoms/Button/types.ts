import { ComponentProps, ReactNode } from "react";
import { Button as RNPButton } from "react-native-paper";
import { type IconProps } from "@/components";
import { Href } from "expo-router";

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
  children?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSkeleton?: boolean;
  mode?: "text" | "contained" | "contained-tonal" | "outlined";
  href?: Href<string>;
};
