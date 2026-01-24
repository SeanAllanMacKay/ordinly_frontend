import React from "react";
import Animated from "react-native-reanimated";

const sizeMapping = {
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
};

export const Text = ({
  children,
  size = "m",
  sharedTransitionTag,
  isBold = false,
}: {
  children: string;
  size?: keyof typeof sizeMapping;
  sharedTransitionTag?: string;
  isBold?: boolean;
}) => {
  return (
    <Animated.Text
      style={{
        fontSize: sizeMapping[size],
        zIndex: 1,
        fontWeight: isBold ? "bold" : "normal",
      }}
      sharedTransitionTag={sharedTransitionTag}
    >
      {children}
    </Animated.Text>
  );
};
