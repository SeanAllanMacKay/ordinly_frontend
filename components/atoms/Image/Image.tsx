import { Image as RNImage } from "react-native";
import { ImageProps } from "./types";
import React, { useState } from "react";
import { imageStyles } from "./styles";

export const Image = ({
  variant,
  size = "md",
  onLoad,
  ...imageProps
}: ImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  return (
    <RNImage
      {...imageProps}
      style={[
        variant && imageStyles[variant],
        imageStyles[size],
        { aspectRatio },
      ]}
      onLoad={(event) => {
        const { width, height } = event.nativeEvent.source || {};

        if (!variant) {
          setAspectRatio(width / height);
        }

        onLoad?.(event);
      }}
    />
  );
};
