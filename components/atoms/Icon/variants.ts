import { MD3Theme } from "react-native-paper";
import { ContentColorProp } from "@/styles/types";

type ThemeColors = MD3Theme["colors"];

export type IconMode = "text" | "contained" | "contained-tonal" | "outlined";

type ColorRole = {
  main: keyof ThemeColors;
  on: keyof ThemeColors;
  container: keyof ThemeColors;
  onContainer: keyof ThemeColors;
};

/**
 * MD3 quartets for the semantic base colors. Only these `color` values map to a
 * full filled/tonal role set; anything else falls back to {@link NEUTRAL_ROLE}.
 */
const ICON_COLOR_ROLES: Partial<Record<ContentColorProp, ColorRole>> = {
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
  tertiary: {
    main: "tertiary",
    on: "onTertiary",
    container: "tertiaryContainer",
    onContainer: "onTertiaryContainer",
  },
  error: {
    main: "error",
    on: "onError",
    container: "errorContainer",
    onContainer: "onErrorContainer",
  },
};

const NEUTRAL_ROLE: ColorRole = {
  main: "onSurface",
  on: "surface",
  container: "surfaceVariant",
  onContainer: "onSurfaceVariant",
};

/**
 * Translates the Icon's semantic `color` + a Button-style `mode` into the
 * container fill, glyph color, and border color used to render the icon.
 * `mode` decides how the color role is applied (filled container vs. tonal vs.
 * outline vs. a bare tinted glyph). Mirrors `getIconButtonVariantColors` in
 * `Button/variants.ts`, but keyed by `color` rather than `variant`.
 */
export const getIconModeColors = (
  color: ContentColorProp,
  mode: IconMode,
  colors: ThemeColors,
): { containerColor?: string; iconColor: string; borderColor?: string } => {
  const role = ICON_COLOR_ROLES[color] ?? NEUTRAL_ROLE;

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
    case "outlined":
      return {
        borderColor: colors[role.main] as string,
        iconColor: colors[color] as string,
      };
    default:
      // "text" — bare tinted glyph, no container.
      return { iconColor: colors[color] as string };
  }
};
