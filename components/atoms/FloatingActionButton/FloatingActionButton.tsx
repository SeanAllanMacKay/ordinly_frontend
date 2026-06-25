import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { FAB, Portal, useTheme } from "react-native-paper";
import { IconProps } from "../Icon";
import { Href, Link, useRouter } from "expo-router";
import { ConditionalWrapper } from "../ContitionalWrapper";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { Spacing } from "@/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";
import { CompanyPermissionFlag } from "@/api/entities/types";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";

export const FloatingActionButton = ({
  icon,
  label,
  onPress,
  items,
  href,
  permission,
  deniedMessage,
}: {
  icon: IconProps["name"];
  label?: string;
  onPress?: () => void;
  // When set, the single-FAB variant is gated on this RBAC flag: if the current
  // company lacks it, pressing shows the permission-denied modal.
  permission?: CompanyPermissionFlag;
  deniedMessage?: string;
} & (
  | { href: Href; items?: undefined }
  | { onPress: () => void; href?: undefined; items?: undefined }
  | {
      items: ({
        icon: IconProps["name"];
        label?: string;
      } & (
        | { onPress: () => void; href?: undefined }
        | { href: Href; onPress?: undefined }
      ))[];
      href?: undefined;
    }
)) => {
  const { bottom } = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const { isDenied, showDenied } = usePermissionGate({
    permission,
    deniedMessage,
  });

  const isPhone = useIsPhone();

  const BOTTOM_MENU_HEIGHT = 55;
  const bottomOffset = Platform.select({
    web: isPhone ? BOTTOM_MENU_HEIGHT + Spacing.lg : Spacing.lg,
    ios: (items ? 0 : bottom) + Spacing.sm,
  });

  return items?.length ? (
    <FAB.Group
      visible
      open={isOpen}
      onStateChange={() => {
        setIsOpen(!isOpen);
      }}
      icon={icon}
      label={label}
      onPress={onPress}
      actions={items.map(({ icon, label, onPress, href }) => ({
        icon,
        color: theme.colors.onSecondary,
        label,
        onPress: href ? () => router.navigate(href) : onPress,
        style: { backgroundColor: theme.colors.secondary },
        labelStyle: { color: theme.colors.onSurface },
      }))}
      style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
      fabStyle={{ marginBottom: bottomOffset, marginRight: Spacing.md }}
      backdropColor={"transparent"}
    />
  ) : (
    <Animated.View
      style={StyleSheet.flatten([styles.fabStyle])}
      entering={ZoomIn.duration(150)}
      exiting={ZoomOut.duration(150)}
    >
      <ConditionalWrapper
        wrapper={<Link href={href as Href} asChild />}
        isWrapped={!!href && !isDenied}
      >
        <FAB
          icon={icon}
          label={label}
          onPress={isDenied ? showDenied : onPress}
        />
      </ConditionalWrapper>
    </Animated.View>
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
