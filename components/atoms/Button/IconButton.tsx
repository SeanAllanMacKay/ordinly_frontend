import { LayoutChangeEvent, View } from "react-native";
import { IconButton } from "react-native-paper";
import { buttonStyles } from "./styles";
import { useState } from "react";
import React from "react";
import { Skeleton } from "../Skeleton";
import { IconButtonProps } from "./types";

export const IconButtonRender = ({
  icon,
  isLoading,
  isDisabled,
  mode,
  ...restProps
}: IconButtonProps) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>();

  const handleLayout = (event: LayoutChangeEvent) => {
    if (!dimensions) {
      const { width, height } = event.nativeEvent.layout;

      setDimensions({ width, height });
    }
  };

  return (
    <View style={buttonStyles.contentContainer} onLayout={handleLayout}>
      <IconButton
        icon={icon}
        mode={
          mode && ["contained", "contained-tonal", "outlined"].includes(mode)
            ? (mode as "contained" | "contained-tonal" | "outlined")
            : undefined
        }
        loading={isLoading}
        disabled={isLoading || isDisabled}
        {...restProps}
      />

      {dimensions && isLoading ? (
        <View style={{ position: "absolute" }}>
          <Skeleton height={dimensions.height} width={dimensions?.width} />
        </View>
      ) : null}
    </View>
  );
};
