import React from "react";
import { Icon, type IconProps } from "@/components";

type IconName = IconProps["name"];

export const makeIcon =
  (name: IconName) =>
  (props: { focused?: boolean; style?: any; color: string }) =>
    <TabBarIcon name={name} {...props} />;

export const TabBarIcon = ({
  focused,
  ...props
}: {
  name: IconName;
  style?: any;
  focused?: boolean;
}) => <Icon {...props} weight={focused ? "fill" : "regular"} />;
