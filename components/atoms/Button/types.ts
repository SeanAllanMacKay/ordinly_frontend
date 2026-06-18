import { ComponentProps, ReactNode } from "react";
import { Button as RNPButton } from "react-native-paper";
import { type IconProps } from "../Icon";
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
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSkeleton?: boolean;
  mode?: "text" | "contained" | "contained-tonal" | "outlined";
  href?: Href;
};

export type ButtonRenderProps = Omit<ButtonProps, "href">;

export type IconButtonProps = Omit<ButtonRenderProps, "children" | "icon"> & {
  icon: IconProps["name"];
};
