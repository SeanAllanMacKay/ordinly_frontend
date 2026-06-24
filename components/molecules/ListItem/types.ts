import { PropsWithChildren } from "react";
import { type Href } from "expo-router";

export type ListItemProps = PropsWithChildren<{
  href?: Href;
  onPress?: () => void;
}>;
