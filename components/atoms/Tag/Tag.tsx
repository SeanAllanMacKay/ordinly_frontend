import React, { useMemo } from "react";
import { Chip, useTheme } from "react-native-paper";

import { View } from "react-native";
import { Link } from "expo-router";
import { Typography } from "../Typography";
import { Icon, IconProps } from "../Icon";
import { Spacing } from "@/styles";

type TagProps = { onPress?: () => void } & {
  text: string;
  color?: string;
  icon?: IconProps["name"];
  right?: React.ReactNode;
};

export const Tag = ({ href, ...restProps }: TagProps & { href?: string }) =>
  href ? (
    <Link href={href} asChild>
      <TagRender {...restProps} />
    </Link>
  ) : (
    <TagRender {...restProps} />
  );

const TagRender = ({ onPress, text, color, icon, right }: TagProps) => {
  const theme = useTheme();

  return (
    <View>
      <Chip
        onPress={onPress}
        style={{
          backgroundColor: color ? `${color}60` : theme.colors.surfaceVariant,
          gap: Spacing.sm,
        }}
        icon={() => (icon ? <Icon name={icon} color={"onBackground"} /> : null)}
      >
        <Typography color={"onBackground"}>{text}</Typography>
      </Chip>
    </View>
  );
};
