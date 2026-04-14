import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import {
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { PaperProvider } from "@/styles/PaperProvider";
import { Button, Typography } from "@/components";
import { drawerStyles } from "./styles";
import { useTheme } from "react-native-paper";
import { DrawerProps } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Drawer = ({
  title,
  isVisible,
  children,
  actions,
  onClose,
}: DrawerProps) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <RNModal transparent={true} visible={isVisible}>
      <PaperProvider>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            drawerStyles.position,
            { backgroundColor: theme.dark ? "#ffffff30" : "#00000030" },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

          <Animated.View
            layout={LinearTransition.damping(20).stiffness(150)}
            style={[
              drawerStyles.container,
              {
                backgroundColor: theme.colors.surface,
                height,
                paddingTop: top,
                width: width,
              },
            ]}
            entering={SlideInRight}
            exiting={SlideOutLeft}
          >
            <View style={drawerStyles.headerContainer}>
              {title ? (
                typeof title === "string" ? (
                  <Typography emphasis="high">{title}</Typography>
                ) : (
                  title
                )
              ) : (
                <View />
              )}

              <Button icon="close" onPress={onClose} />
            </View>

            <ScrollView style={drawerStyles.contentContainer}>
              {children}
            </ScrollView>

            {actions?.length ? (
              <View style={drawerStyles.actionsContainer}>{actions}</View>
            ) : null}
          </Animated.View>
        </Animated.View>
      </PaperProvider>
    </RNModal>
  );
};
