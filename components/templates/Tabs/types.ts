import { BadgeProps } from "@/components/atoms";
import { PropsWithChildren } from "react";

export type TabSceneProps = PropsWithChildren<{
  tabKey: string;
  label: string;
  isDisabled?: boolean;
  badge?: BadgeProps["value"];
}>;

export type SceneMapType = {
  [key: string]: () => TabSceneProps["children"];
};

export type RouteType = {
  key: string;
  title: string;
};
