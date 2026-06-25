import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { CardRender } from "./CardRender";
import { CardProps } from "./types";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";

export const Card = ({ permission, deniedMessage, ...props }: CardProps) => {
  // Only opt into the gating hook when a permission is declared, so plain
  // cards stay free of the extra company-query subscription.
  return permission ? (
    <GatedCard permission={permission} deniedMessage={deniedMessage} {...props} />
  ) : (
    <BaseCard {...props} />
  );
};

const GatedCard = ({ permission, deniedMessage, ...props }: CardProps) => {
  const { isDenied, showDenied } = usePermissionGate({
    permission,
    deniedMessage,
  });

  if (isDenied) {
    // Swallow navigation/handler and show the permission-denied modal instead.
    const { href: _href, onPress: _onPress, ...rest } = props;
    return (
      <Pressable onPress={showDenied}>
        <CardRender {...rest} />
      </Pressable>
    );
  }

  return <BaseCard {...props} />;
};

const BaseCard = ({
  href,
  onPress,
  ...restProps
}: Omit<CardProps, "permission" | "deniedMessage">) => {
  return href ? (
    <Link href={href} asChild>
      <Pressable>
        <CardRender {...restProps} />
      </Pressable>
    </Link>
  ) : onPress ? (
    <Pressable onPress={onPress}>
      <CardRender {...restProps} />
    </Pressable>
  ) : (
    <CardRender {...restProps} />
  );
};
