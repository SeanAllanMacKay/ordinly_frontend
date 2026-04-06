import React from "react";
import { Platform, Text, View } from "react-native";

import { LARGE_BREAKPOINT } from "@/constants/breakpoints";
import { TabBarItem } from "../TabBar";
import { Spacing } from "@/styles";
import { useWidth } from "@/styles";
import { Icon } from "@/components/atoms";

export const SideBarItem = ({
  children,
  icon,
  name,
}: {
  children: string;
  icon: (props: { focused?: boolean; color?: string }) => JSX.Element;
  name: string;
}) => {
  const isLarge = useWidth(LARGE_BREAKPOINT);

  return (
    <TabBarItem
      name={name}
      id={name}
      style={{ paddingVertical: 4, width: "100%" }}
    >
      {({ focused, hovered }) => (
        <View
          style={[
            {
              padding: 12,
              flexDirection: isLarge ? "row" : "column",
              alignItems: "center",
              borderRadius: 999,
            },
          ]}
        >
          <View
            style={[
              !isLarge && {
                padding: Spacing.xs,
              },
              hovered && {
                transform: [{ scale: 1.1 }],
              },
              hovered &&
                !isLarge && {
                  backgroundColor: "#00000010",
                  borderRadius: 999,
                },
            ]}
          >
            <Icon name={icon} size="lg" />
          </View>

          <Text
            style={[
              {
                color: "#000000",
                fontSize: isLarge ? 16 : 12,
                marginHorizontal: isLarge ? Spacing.md : undefined,
                lineHeight: isLarge ? 24 : undefined,
              },
              Platform.select({
                default: { display: isLarge ? "flex" : undefined },
              }),
              focused && { fontWeight: "bold" },
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TabBarItem>
  );
};
