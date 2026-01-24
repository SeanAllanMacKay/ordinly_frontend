import React, { ReactNode, type ComponentProps } from "react";
import { Button as RNPButton, IconButton } from "react-native-paper";
import { type IconProps } from "@/components";
import { Link } from "expo-router";

export const Button = ({
  href,
  ...restProps
}: ComponentProps<typeof ButtonRender> & {
  href?: string;
}) =>
  href ? (
    <Link href={href} asChild>
      <ButtonRender {...restProps} />
    </Link>
  ) : (
    <ButtonRender {...restProps} />
  );

const ButtonRender = ({
  icon,
  children,
  mode,
  ...restProps
}: Omit<ComponentProps<typeof RNPButton>, "icon" | "children"> & {
  icon?: IconProps["name"];
  children?: ReactNode;
}) => {
  if (icon && !children) {
    return (
      <IconButton
        icon={icon}
        mode={
          (["contained", "contained-tonal", "outlined"] as const).includes(mode)
            ? (mode as "contained" | "contained-tonal" | "outlined")
            : undefined
        }
        {...restProps}
      />
    );
  }

  return (
    <RNPButton icon={icon} mode={mode} {...restProps}>
      {children}
    </RNPButton>
  );
};
