import React from "react";
import { Link } from "expo-router";
import { ButtonProps } from "./types";
import { ButtonRender } from "./ButtonRender";
import { IconButtonRender } from "./IconButton";

export const Button = ({ href, icon, label, ...restProps }: ButtonProps) => {
  return href ? (
    <Link href={href} asChild>
      {icon && !label ? (
        <IconButtonRender icon={icon} {...restProps} />
      ) : (
        <ButtonRender icon={icon} label={label} {...restProps} />
      )}
    </Link>
  ) : icon && !label ? (
    <IconButtonRender icon={icon} {...restProps} />
  ) : (
    <ButtonRender icon={icon} label={label} {...restProps} />
  );
};
