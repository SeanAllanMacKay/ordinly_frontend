import { Spacing } from "@/constants/Spacing";
import { Link } from "expo-router";
import React, { ComponentProps, PropsWithChildren } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components";

export const Card = ({
  href,
  onPress,
  ...restProps
}: ComponentProps<typeof CardRender> & { href?: string }) => {
  return href ? (
    <Link href={href} asChild>
      <Pressable>
        <CardRender {...restProps} />
      </Pressable>
    </Link>
  ) : onPress ? (
    <Pressable onPress={onPress}>
      <CardRender {...restProps} />
    </Pressable>
  ) : (
    <CardRender {...restProps} />
  );
};

export const CardRender = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  headerRight,
  actions,
}: PropsWithChildren<{
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  style?: any;
  headerRight?: React.ReactElement;
  actions?: React.ReactElement[];
}>) => {
  return (
    <View
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: Spacing.m,
      }}
    >
      <View>
        {title || subtitle ? (
          <View style={{ paddingHorizontal: Spacing.m, paddingTop: Spacing.m }}>
            {title ? <Text size={"l"}>{title}</Text> : null}
            {subtitle ? <Text>{subtitle}</Text> : null}
          </View>
        ) : null}

        <View style={{ padding: Spacing.m }}>{children}</View>
      </View>

      {actions?.length ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: Spacing.m,
            paddingLeft: Spacing.m,
            paddingBottom: Spacing.m,
            justifyContent: "flex-end",
            gap: Spacing.m,
            flexWrap: "wrap",
          }}
        >
          {actions}
        </View>
      ) : null}
    </View>
  );
};
