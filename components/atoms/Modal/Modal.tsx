import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  SlideInDown,
  SlideOutUp,
} from "react-native-reanimated";
import {
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Link } from "expo-router";
import { PaperProvider } from "@/styles/PaperProvider";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Spacing } from "@/styles";
import { modalStyles } from "./styles";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { useTheme } from "react-native-paper";
import { ModalProps } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Modal = ({
  title,
  isVisible,
  children,
  actions,
  onClose,
}: ModalProps) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const isPhone = useIsPhone();

  return (
    <RNModal transparent={true} visible={isVisible}>
      <PaperProvider>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            modalStyles.position,
            { justifyContent: isPhone ? "flex-end" : "center" },
            { backgroundColor: theme.dark ? "#ffffff30" : "#00000030" },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

          <Animated.View
            layout={LinearTransition.damping(20).stiffness(150)}
            style={[
              modalStyles.container,
              {
                backgroundColor: theme.colors.surface,
                maxHeight: height - top - Spacing.lg,
              },
              isPhone
                ? {
                    width,
                    borderTopLeftRadius: Spacing.md,
                    borderTopRightRadius: Spacing.md,
                  }
                : {
                    width: width * 0.8,
                    borderRadius: Spacing.md,
                    maxHeight: height * 0.75,
                  },
            ]}
            entering={isPhone ? SlideInDown : FadeInDown}
            exiting={SlideOutUp}
          >
            <View style={modalStyles.headerContainer}>
              {title ? (
                <Typography emphasis="high">{title}</Typography>
              ) : (
                <View />
              )}

              <Button icon="close" onPress={onClose} />
            </View>

            <ScrollView style={modalStyles.contentContainer}>
              {children}
            </ScrollView>

            {actions?.length ? (
              <View style={modalStyles.actionsContainer}>{actions}</View>
            ) : null}
          </Animated.View>
        </Animated.View>
      </PaperProvider>
    </RNModal>
  );
};
