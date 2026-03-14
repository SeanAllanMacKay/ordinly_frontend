import React, { useMemo } from "react";
import { Chip } from "react-native-paper";

import { View } from "react-native";
import { Link } from "expo-router";

type TagProps = { onPress?: () => void } & {
  variant: string;
  text: string;
  color: string;
};

export const Tag = ({ href, ...restProps }: TagProps & { href?: string }) =>
  href ? (
    <Link href={href} asChild>
      <TagRender {...restProps} />
    </Link>
  ) : (
    <TagRender {...restProps} />
  );

const TagRender = ({ onPress, text, color }: TagProps) => {
  return (
    <View>
      <Chip onPress={onPress} style={{ backgroundColor: `${color}20` }}>
        {text}
      </Chip>
    </View>
  );
};
