import React, { PropsWithChildren } from "react";
import { Portal } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  SlideInDown,
  SlideOutUp,
} from "react-native-reanimated";
import {
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Link } from "expo-router";
import { PaperProvider } from "@/styles/PaperProvider";
import { Text, Button } from "@/components";
import { DESKTOP_WIDTH, PHONE_WIDTH } from "@/constants/breakpoints";
import { Spacing } from "@/constants/Spacing";

export const Modal = ({
  title,
  isVisible,
  children,
  actions,
}: PropsWithChildren<{
  title?: string;
  isVisible: boolean;
  actions?: React.ReactElement[];
}>) => {
  const { height, width } = useWindowDimensions();

  const isDesktop = width > DESKTOP_WIDTH;
  const isPhone = width <= PHONE_WIDTH;

  return (
    <Portal>
      <RNModal transparent={true} visible={isVisible}>
        <PaperProvider>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isPhone ? "flex-end" : "center",
              backgroundColor: "#00000025",
            }}
          >
            <Link href={"../"} asChild>
              <Pressable style={StyleSheet.absoluteFill} />
            </Link>
            <Animated.View
              style={[
                {
                  minWidth: 300,
                  maxWidth: 600,
                  backgroundColor: "#ffffff",
                  ...(isPhone
                    ? {
                        width,
                        borderTopLeftRadius: Spacing.m,
                        borderTopRightRadius: Spacing.m,
                      }
                    : {
                        width: width * 0.8,
                        borderRadius: Spacing.m,
                        maxHeight: height * 0.75,
                      }),
                },
              ]}
              entering={isPhone ? SlideInDown : FadeInDown}
              exiting={SlideOutUp}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: 16,
                }}
              >
                {title ? <Text isBold>{title}</Text> : <View />}
                <Button icon="close" href="../"></Button>
              </View>

              <ScrollView style={{ padding: 16 }}>{children}</ScrollView>

              {actions?.length ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: Spacing.m,
                    justifyContent: "flex-end",
                    gap: Spacing.m,
                    flexWrap: "wrap",
                  }}
                >
                  {actions}
                </View>
              ) : null}
            </Animated.View>
          </Animated.View>
        </PaperProvider>
      </RNModal>
    </Portal>
  );
};
