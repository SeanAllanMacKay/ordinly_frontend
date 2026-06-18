import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { AccordionItemProps } from "./types";
import { Pressable, View } from "react-native";
import React, { useContext, useState } from "react";
import { accordionItemStyles } from "./styles";
import { Typography } from "../Typography";
import { AccordionContext } from "./Accordion";
import { useTheme } from "react-native-paper";
import { Icon } from "../Icon";
import { Spacing } from "@/styles";

export const AccordionItem = ({
  id,
  label,
  children,
  isFirst,
  isLast,
}: AccordionItemProps) => {
  const context = useContext(AccordionContext);
  const theme = useTheme();

  const [contentHeight, setContentHeight] = useState(0);
  const isOpen = context.openSections.includes(id);

  const heightProgress = useDerivedValue(() =>
    withTiming(isOpen ? contentHeight : 0, { duration: 200 }),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightProgress.value,
    overflow: "hidden",
  }));

  const rotation = useDerivedValue(() =>
    withTiming(isOpen ? 180 : 0, { duration: 200 }),
  );

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const borderColor = theme.dark
    ? theme.colors.onSurfaceVariant
    : theme.colors.surfaceVariant;

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        accordionItemStyles.itemContainer,
        { borderColor },
        isFirst && accordionItemStyles.firstItem,
        isFirst && isOpen && accordionItemStyles.firstItemOpen,
        isLast && accordionItemStyles.lastItem,
        isLast && isOpen && accordionItemStyles.lastItemOpen,
        !isFirst && !isLast && accordionItemStyles.middleItem,
        !isFirst && !isLast && isOpen && accordionItemStyles.middleItemOpen,
      ]}
    >
      <Pressable
        onPress={() => context.onToggleOpen(id)}
        style={[accordionItemStyles.header]}
      >
        <Typography emphasis="high" color="onBackground">
          {label}
        </Typography>

        <Animated.View style={[chevronStyle]}>
          <Icon name={"chevron-down"} size="xl" />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[accordionItemStyles.contentContainer, animatedStyle]}
      >
        <View
          style={{ position: "absolute", width: "100%" }}
          onLayout={(e) => {
            const { height } = e.nativeEvent.layout;
            if (height > 0 && contentHeight !== height) {
              setContentHeight(height);
            }
          }}
        >
          <View>{children}</View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
