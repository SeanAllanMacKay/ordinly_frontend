import { PropsWithChildren } from "react";
import { type Href } from "expo-router";

export type CardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  href?: Href;
  onPress?: () => void;
  headerLeft?: React.ReactElement;
  headerRight?: React.ReactElement;
  actions?: React.ReactElement[];
}>;

export type CardRenderProps = Omit<CardProps, "onPress" | "href">;
