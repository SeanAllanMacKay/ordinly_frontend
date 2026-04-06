import React, { PropsWithChildren, useMemo, useState } from "react";
import { TabScene } from "./TabScene";
import { TabSceneProps } from "./types";
import { useTheme } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { TabBar } from "./TabBar";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { BadgeProps } from "@/components/atoms";

export const Tabs = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);

  const scenes = useMemo(() => {
    const tabs: {
      value: string;
      label: string;
      badge?: BadgeProps["value"];
    }[] = [];
    const content: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === TabScene) {
        const {
          tabKey,
          label,
          badge,
          children: sceneChildren,
        } = child.props as TabSceneProps;
        tabs.push({ value: tabKey, label, badge });
        content.push(sceneChildren);
      }
    });

    return { tabs, content };
  }, [children]);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-20, 20])
    .onFinalize((event) => {
      const SWIPE_THRESHOLD = 60;

      if (
        event.translationX < -SWIPE_THRESHOLD &&
        activeIndex < scenes.tabs.length - 1
      ) {
        setActiveIndex(activeIndex + 1);
      } else if (event.translationX > SWIPE_THRESHOLD && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    });

  const onTabChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <View style={{ maxHeight: "100%" }}>
      <TabBar
        tabs={scenes.tabs}
        activeIndex={activeIndex}
        onChange={onTabChange}
      />

      <GestureDetector gesture={panGesture}>
        <ScrollView style={{ maxHeight: "100%" }}>
          {scenes.content[activeIndex]}
        </ScrollView>
      </GestureDetector>
    </View>
  );
};

Tabs.Scene = TabScene;
