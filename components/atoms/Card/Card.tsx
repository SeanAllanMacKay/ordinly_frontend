import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { CardRender } from "./CardRender";
import { CardProps } from "./types";

export const Card = ({ href, onPress, ...restProps }: CardProps) => {
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
