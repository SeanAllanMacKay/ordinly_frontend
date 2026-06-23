import { View } from "react-native";
import React from "react";
import { Typography } from "@/components/atoms";
import { entityColor } from "@/util/colors";

export const EntitySwitcherAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .reduce(
      (total, current, index) =>
        index < 3 ? `${total}${current[0].toUpperCase()}` : total,
      "",
    );

  const backgroundColor = entityColor(name);

  return (
    <View
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 20,
      }}
    >
      <Typography colorOverride="#ffffff">{initials}</Typography>
    </View>
  );
};
