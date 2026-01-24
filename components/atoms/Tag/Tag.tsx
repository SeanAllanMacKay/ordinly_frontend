import React, { useMemo } from "react";
import { Chip } from "react-native-paper";

import { PROJECT_STATUSES } from "@/constants/PROJECT_STATUSES";
import { PROJECT_PRIORITIES } from "@/constants/PROJECT_PRIORITIES";
import { View } from "react-native";
import { Link } from "expo-router";

type GenericTagVariants = (typeof genericVariants)[number];
type SpecificTagVariants =
  | (typeof PROJECT_PRIORITIES)[number]["value"]
  | (typeof PROJECT_STATUSES)[number]["value"];

type TagProps = { onPress?: () => void } & (
  | {
      variant: GenericTagVariants;
      text: string;
    }
  | {
      variant: SpecificTagVariants;
    }
);

const genericVariants = ["success", "error", "warning", "default", "info"];

const isGeneric = (
  variant: GenericTagVariants | SpecificTagVariants
): variant is GenericTagVariants => genericVariants.includes(variant);

const colorMapping: Record<(typeof genericVariants)[number], string> = {
  success: "#008000",
  error: "#ff0000",
  warning: "#ffff00",
  default: "#808080",
  info: "#0000FF",
};

export const Tag = ({ href, ...restProps }: TagProps & { href?: string }) =>
  href ? (
    <Link href={href} asChild>
      <TagRender {...restProps} />
    </Link>
  ) : (
    <TagRender {...restProps} />
  );

const TagRender = ({ variant, onPress, ...restProps }: TagProps) => {
  const text = useMemo(() => {
    if (isGeneric(variant) && "text" in restProps) {
      return restProps.text;
    }

    return [...PROJECT_STATUSES, ...PROJECT_PRIORITIES].find(
      ({ value }) => value === variant
    )?.label;
  }, [variant, restProps]);

  const color = useMemo(() => {
    if (isGeneric(variant) && "text" in restProps) {
      colorMapping[variant];
    }

    return [...PROJECT_STATUSES, ...PROJECT_PRIORITIES].find(
      ({ value }) => value === variant
    )?.color;
  }, [variant, restProps]);

  return (
    <View>
      <Chip onPress={onPress} style={{ backgroundColor: `${color}20` }}>
        {text}
      </Chip>
    </View>
  );
};
