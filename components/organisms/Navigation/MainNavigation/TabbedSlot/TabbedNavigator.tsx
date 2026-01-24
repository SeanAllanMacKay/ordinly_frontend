import React, { type ComponentProps } from "react";
import { Navigator, Stack } from "expo-router";
import { TabRouter } from "@react-navigation/native";

import { TabbedSlot } from "./TabbedSlot";
import { TabLink } from "./TabLink";

export const TabbedNavigator = (props: ComponentProps<typeof Navigator>) => (
  <Navigator {...props} router={TabRouter} />
);

TabbedNavigator.Slot = TabbedSlot;
TabbedNavigator.Link = TabLink;
TabbedNavigator.Screen = Stack.Screen;
