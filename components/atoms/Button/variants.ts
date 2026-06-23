import { MD3Theme } from "react-native-paper";
import { ButtonProps } from "./types";

type ThemeColors = MD3Theme["colors"];

export type ButtonVariant = NonNullable<ButtonProps["variant"]>;
export type ButtonMode = NonNullable<ButtonProps["mode"]>;

type VariantRole = {
  main: keyof ThemeColors;
  on: keyof ThemeColors;
  container: keyof ThemeColors;
  onContainer: keyof ThemeColors;
};

const VARIANT_ROLES: Record<ButtonVariant, VariantRole> = {
  primary: {
    main: "primary",
    on: "onPrimary",
    container: "primaryContainer",
    onContainer: "onPrimaryContainer",
  },
  secondary: {
    main: "secondary",
    on: "onSecondary",
    container: "secondaryContainer",
    onContainer: "onSecondaryContainer",
  },
  danger: {
    main: "error",
    on: "onError",
    container: "errorContainer",
    onContainer: "onErrorContainer",
  },
};

/**
 * Translates a semantic `variant` + Paper `mode` into the `buttonColor` /
 * `textColor` props that react-native-paper's `Button` accepts. `variant`
 * selects which MD3 color role is used; `mode` decides how those roles are
 * applied (filled container vs. tinted label).
 */
export const getButtonVariantColors = (
  variant: ButtonVariant,
  mode: ButtonMode,
  colors: ThemeColors,
): { buttonColor?: string; textColor?: string } => {
  const role = VARIANT_ROLES[variant];

  switch (mode) {
    case "contained":
      return {
        buttonColor: colors[role.main] as string,
        textColor: colors[role.on] as string,
      };
    case "contained-tonal":
      return {
        buttonColor: colors[role.container] as string,
        textColor: colors[role.onContainer] as string,
      };
    default:
      // "text" / "outlined" — tint the label, leave the container transparent.
      return { textColor: colors[role.main] as string };
  }
};

/**
 * Same mapping as {@link getButtonVariantColors} but using the `containerColor`
 * / `iconColor` prop names that react-native-paper's `IconButton` expects.
 */
export const getIconButtonVariantColors = (
  variant: ButtonVariant,
  mode: ButtonMode,
  colors: ThemeColors,
): { containerColor?: string; iconColor?: string } => {
  const role = VARIANT_ROLES[variant];

  switch (mode) {
    case "contained":
      return {
        containerColor: colors[role.main] as string,
        iconColor: colors[role.on] as string,
      };
    case "contained-tonal":
      return {
        containerColor: colors[role.container] as string,
        iconColor: colors[role.onContainer] as string,
      };
    default:
      // "outlined" / undefined — tint the icon, leave the container transparent.
      return { iconColor: colors[role.main] as string };
  }
};
