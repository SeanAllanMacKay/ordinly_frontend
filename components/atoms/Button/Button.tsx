import React, { useRef, useState } from "react";
import { Button as RNPButton, IconButton } from "react-native-paper";
import { Href, Link } from "expo-router";
import { ButtonProps } from "./types";
import { buttonStyle } from "./styles";
import { LayoutChangeEvent, View } from "react-native";
import { Skeleton } from "../Skeleton";

export const Button = ({ href, ...restProps }: ButtonProps) =>
  href ? (
    <Link href={href as Href<string>} asChild>
      <ButtonRender {...restProps} />
    </Link>
  ) : (
    <ButtonRender {...restProps} />
  );

const ButtonRender = ({
  icon,
  children,
  mode = "text",
  isLoading,
  isDisabled,
  ...restProps
}: Omit<ButtonProps, "href">) => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>();

  const handleLayout = (event: LayoutChangeEvent) => {
    console.log(event.nativeEvent);
    if (!dimensions) {
      const { width, height } = event.nativeEvent.layout;

      setDimensions({ width, height });
    }
  };

  if (icon && !children) {
    return (
      <IconButton
        icon={icon}
        mode={
          ["contained", "contained-tonal", "outlined"].includes(mode)
            ? (mode as "contained" | "contained-tonal" | "outlined")
            : undefined
        }
        loading={isLoading}
        disabled={isLoading || isDisabled}
        ref={ref}
        {...restProps}
      />
    );
  }

  return (
    <RNPButton
      icon={icon}
      mode={mode}
      loading={isLoading}
      disabled={isLoading || isDisabled}
      contentStyle={buttonStyle.content}
      onLayout={handleLayout}
      ref={ref}
      {...restProps}
    >
      {dimensions ? (
        <View style={{ position: "absolute" }}>
          <Skeleton height={dimensions?.height} width={dimensions?.width} />
        </View>
      ) : null}
      {children}
    </RNPButton>
  );
};
