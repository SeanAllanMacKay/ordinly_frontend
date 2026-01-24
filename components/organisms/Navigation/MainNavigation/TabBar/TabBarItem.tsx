import React from "react";
import { Link } from "expo-router";
import { Pressable } from "@bacons/react-views";
import { type ViewStyle } from "react-native";

import { useIsTabSelected } from "@/components/organisms/Navigation/hooks";
import { TabbedNavigator } from "../TabbedSlot";

export const TabBarItem = ({
  children,
  name,
  style,
  id,
}: {
  children?: any;
  name: string;
  style?: ViewStyle;
  id: string;
}) => {
  const isFocused = useIsTabSelected(id);

  if (name.startsWith("/") || name.startsWith(".")) {
    return (
      <Link href={name} asChild style={style}>
        <Pressable>
          {(props) => children({ ...props, focused: isFocused })}
        </Pressable>
      </Link>
    );
  }

  return (
    <TabbedNavigator.Link name={id} asChild style={style}>
      <Pressable>
        {(props) => children({ ...props, focused: isFocused })}
      </Pressable>
    </TabbedNavigator.Link>
  );
};
