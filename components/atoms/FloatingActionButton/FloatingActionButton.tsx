import React, { ComponentProps, useState } from "react";
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
} from "react-native";
import { FAB } from "react-native-paper";
import { Icon, IconProps } from "@/components";
import { Link } from "expo-router";

export const FloatingActionButton = ({
  href,
  ...restProps
}: ComponentProps<typeof FloatingActionButtonRender> & {
  href?: string;
}) =>
  href ? (
    <Link href={href} asChild>
      <FloatingActionButtonRender {...restProps} />
    </Link>
  ) : (
    <FloatingActionButtonRender {...restProps} />
  );

const FloatingActionButtonRender = ({
  icon,
  label,
  onPress,
}: {
  icon: IconProps["name"];
  label: string;
  onPress?: () => void;
}) => {
  return (
    <FAB
      icon={icon}
      label={label}
      onPress={onPress}
      style={[styles.fabStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
