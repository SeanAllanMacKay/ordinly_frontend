import React from "react";
import { Link } from "expo-router";

import { CommonActions } from "@react-navigation/native";

import {
  useLinkBuilder,
  useContextRoute,
} from "@/components/organisms/Navigation/hooks";

export const TabLink = ({
  name,
  ...props
}: { name: string } & Omit<
  React.ComponentProps<typeof Link>,
  "href" | "onPress" | "onLongPress"
>) => {
  const buildLink = useLinkBuilder();
  const contextRoute = useContextRoute(name);

  const link = buildLink(name);

  if (!contextRoute) {
    return null;
  }

  const { route, target, navigation } = contextRoute;

  const onPress = (event) => {
    const navigationEvent = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!navigationEvent.defaultPrevented) {
      event.preventDefault();

      navigation.dispatch({
        ...CommonActions.navigate({ name: route.name, merge: true }),
        target,
      });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  if (!link) {
    return null;
  }

  return (
    <Link {...props} href={link} onPress={onPress} onLongPress={onLongPress} />
  );
};
