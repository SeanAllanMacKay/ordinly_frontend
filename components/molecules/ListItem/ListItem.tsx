import { Link } from "expo-router";
import React, { PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { ListItemProps } from "./types";
import { listItemStyles } from "./styles";

const ListItemRender = ({ children }: PropsWithChildren) => (
  <View style={listItemStyles.container}>{children}</View>
);

export const ListItem = ({ href, onPress, children }: ListItemProps) =>
  href ? (
    <Link href={href} asChild>
      <Pressable>
        <ListItemRender>{children}</ListItemRender>
      </Pressable>
    </Link>
  ) : onPress ? (
    <Pressable onPress={onPress}>
      <ListItemRender>{children}</ListItemRender>
    </Pressable>
  ) : (
    <ListItemRender>{children}</ListItemRender>
  );
