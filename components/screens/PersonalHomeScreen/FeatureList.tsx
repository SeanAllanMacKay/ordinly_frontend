import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Icon, IconProps, Typography } from "@/components";
import { Spacing } from "@/styles";

export type FeatureItem = {
  icon: IconProps["name"];
  title: string;
  subtitle: string;
};

const TWO_COLUMN_MIN_WIDTH = 360;

export const FeatureList = ({ items }: { items: FeatureItem[] }) => {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const columns = width && width >= TWO_COLUMN_MIN_WIDTH ? 2 : 1;

  return (
    <View
      onLayout={onLayout}
      style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}
    >
      {items.map((item) => (
        <View
          key={item.title}
          style={{
            width: columns === 2 ? "47%" : "100%",
            flexGrow: 1,
            flexDirection: "row",
            gap: Spacing.sm,
            alignItems: "flex-start",
          }}
        >
          <Icon
            name={item.icon}
            mode="contained-tonal"
            size="md"
            color="secondary"
          />

          <View style={{ flex: 1, gap: Spacing.xs }}>
            <Typography size="sm" emphasis="high">
              {item.title}
            </Typography>
            <Typography size="xs" color="onSurfaceVariant">
              {item.subtitle}
            </Typography>
          </View>
        </View>
      ))}
    </View>
  );
};
