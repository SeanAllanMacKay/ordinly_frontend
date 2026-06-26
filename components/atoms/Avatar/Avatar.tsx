import React, { useState } from "react";
import { Image, View } from "react-native";

import { Typography } from "@/components/atoms/Typography";
import { entityColor } from "@/util/colors";

import { AvatarProps } from "./types";
import { getInitials } from "./getInitials";
import {
  AVATAR_DIMENSIONS,
  AVATAR_INITIALS_SIZE,
  AVATAR_ROUNDED_SQUARE_RADIUS_RATIO,
} from "./styles";

export const Avatar = ({
  name,
  imageURL,
  size = "md",
  shape,
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const dimension = AVATAR_DIMENSIONS[size];
  const borderRadius =
    shape === "circle"
      ? dimension / 2
      : dimension * AVATAR_ROUNDED_SQUARE_RADIUS_RATIO;

  const sharedStyle = {
    width: dimension,
    height: dimension,
    borderRadius,
  } as const;

  if (imageURL && !hasError) {
    return (
      <Image
        source={{ uri: imageURL }}
        style={sharedStyle}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <View
      style={[
        sharedStyle,
        {
          backgroundColor: entityColor(name),
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Typography size={AVATAR_INITIALS_SIZE[size]} colorOverride="#ffffff">
        {getInitials(name)}
      </Typography>
    </View>
  );
};
