import React from "react";
import { Link } from "expo-router";
import { ButtonProps } from "./types";
import { ButtonRender } from "./ButtonRender";
import { IconButtonRender } from "./IconButton";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";

export const Button = ({
  permission,
  deniedMessage,
  ...props
}: ButtonProps) => {
  // Only opt into the gating hook when a permission is declared, so the vast
  // majority of buttons stay free of the extra company-query subscription.
  return permission ? (
    <GatedButton
      permission={permission}
      deniedMessage={deniedMessage}
      {...props}
    />
  ) : (
    <BaseButton {...props} />
  );
};

const GatedButton = ({
  permission,
  deniedMessage,
  ...props
}: ButtonProps) => {
  const { isDenied, showDenied } = usePermissionGate({
    permission,
    deniedMessage,
  });

  if (isDenied) {
    // Render inline (never as a Link) and swap the handler so the press opens
    // the permission-denied modal instead of acting. Left visually enabled.
    const { href: _href, onPress: _onPress, icon, label, ...rest } = props;
    return icon && !label ? (
      <IconButtonRender icon={icon} onPress={showDenied} {...rest} />
    ) : (
      <ButtonRender
        icon={icon}
        label={label}
        onPress={showDenied}
        {...rest}
      />
    );
  }

  return <BaseButton {...props} />;
};

const BaseButton = ({
  href,
  icon,
  label,
  ...restProps
}: Omit<ButtonProps, "permission" | "deniedMessage">) => {
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
