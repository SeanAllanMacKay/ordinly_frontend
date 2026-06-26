import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { Avatar } from "@/components/atoms";
import {
  AVATAR_DIMENSIONS,
  AVATAR_INITIALS_SIZE,
  AVATAR_ROUNDED_SQUARE_RADIUS_RATIO,
} from "@/components/atoms/Avatar/styles";
import { Typography } from "@/components/atoms/Typography";

import { AvatarStackProps } from "./types";
import {
  AVATAR_STACK_OVERLAP_RATIO,
  AVATAR_STACK_RING_WIDTH,
  avatarStackStyles,
} from "./styles";

export const AvatarStack = ({
  items,
  max = 4,
  size = "md",
  shape = "circle",
}: AvatarStackProps) => {
  const theme = useTheme();

  const dimension = AVATAR_DIMENSIONS[size];
  const overlap = dimension * AVATAR_STACK_OVERLAP_RATIO;
  const ringRadius =
    shape === "circle"
      ? (dimension + AVATAR_STACK_RING_WIDTH * 2) / 2
      : dimension * AVATAR_ROUNDED_SQUARE_RADIUS_RATIO + AVATAR_STACK_RING_WIDTH;

  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  const ringStyle = (isFirst: boolean) => ({
    marginLeft: isFirst ? 0 : -overlap,
    borderWidth: AVATAR_STACK_RING_WIDTH,
    borderColor: theme.colors.surface,
    borderRadius: ringRadius,
    backgroundColor: theme.colors.surface,
  });

  return (
    <View style={avatarStackStyles.container}>
      {visible.map((item, index) => (
        <View key={`${item.name}-${index}`} style={ringStyle(index === 0)}>
          <Avatar
            name={item.name}
            imageURL={item.imageURL}
            size={size}
            shape={shape}
          />
        </View>
      ))}

      {overflow > 0 ? (
        <View style={ringStyle(visible.length === 0)}>
          <View
            style={[
              avatarStackStyles.bubble,
              {
                width: dimension,
                height: dimension,
                borderRadius:
                  shape === "circle"
                    ? dimension / 2
                    : dimension * AVATAR_ROUNDED_SQUARE_RADIUS_RATIO,
                backgroundColor: theme.colors.surfaceVariant,
              },
            ]}
          >
            <Typography size={AVATAR_INITIALS_SIZE[size]} color="onSurfaceVariant">
              {`+${overflow}`}
            </Typography>
          </View>
        </View>
      ) : null}
    </View>
  );
};
