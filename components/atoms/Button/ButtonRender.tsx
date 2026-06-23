import React, { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import { ButtonProps } from "./types";
import { buttonStyles } from "./styles";
import { getButtonVariantColors } from "./variants";
import { LayoutChangeEvent, View } from "react-native";
import { Skeleton } from "../Skeleton";

export const ButtonRender = ({
  icon,
  label,
  mode = "text",
  variant = "primary",
  isLoading,
  isDisabled,
  ...restProps
}: Omit<ButtonProps, "href">) => {
  const theme = useTheme();
  const { buttonColor, textColor } = getButtonVariantColors(
    variant,
    mode,
    theme.colors,
  );
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
    <View style={{ position: "relative" }} onLayout={handleLayout}>
      <Button
        icon={icon}
        mode={mode}
        buttonColor={buttonColor}
        textColor={textColor}
        loading={isLoading}
        disabled={isLoading || isDisabled}
        contentStyle={buttonStyles.contentContainer}
        {...restProps}
      >
        {label}
      </Button>

      {dimensions && isLoading ? (
        <View style={{ position: "absolute" }}>
          <Skeleton height={dimensions.height} width={dimensions?.width} />
        </View>
      ) : null}
    </View>
  );
};
