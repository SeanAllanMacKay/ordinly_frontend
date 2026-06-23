/**
 * Deterministically derives a background color from an entity's name.
 *
 * The hue is driven by a hash of the name (so the same name always maps to the
 * same color), while saturation and lightness are held constant. Those fixed
 * values are deliberately muted (moderate saturation) and dark (low lightness)
 * so that:
 *   - the result harmonizes with the desaturated, blue-based MD3 design system
 *     rather than producing harsh neon tones, and
 *   - white text always stays legible on top, regardless of the chosen hue
 *     (even high-luminance hues like yellow/green clear ~3.5:1 contrast at
 *     these values, comfortably readable for bold avatar initials).
 */

// Tuned so the lightest possible hue (yellow-green) still keeps white text
// legible, while staying muted enough to sit alongside the design system.
const SATURATION = 48;
const LIGHTNESS = 36;

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    // djb2-style hash: hash * 33 + char, kept in 32-bit space.
    hash = (hash << 5) + hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const hslToHex = (h: number, s: number, l: number): string => {
  const sFraction = s / 100;
  const lFraction = l / 100;

  const chroma = (1 - Math.abs(2 * lFraction - 1)) * sFraction;
  const hPrime = h / 60;
  const x = chroma * (1 - Math.abs((hPrime % 2) - 1));
  const m = lFraction - chroma / 2;

  let [r, g, b] = [0, 0, 0];
  if (hPrime < 1) [r, g, b] = [chroma, x, 0];
  else if (hPrime < 2) [r, g, b] = [x, chroma, 0];
  else if (hPrime < 3) [r, g, b] = [0, chroma, x];
  else if (hPrime < 4) [r, g, b] = [0, x, chroma];
  else if (hPrime < 5) [r, g, b] = [x, 0, chroma];
  else [r, g, b] = [chroma, 0, x];

  const toHex = (channel: number) =>
    Math.round((channel + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Returns a stable, design-system-friendly hex color for the given name.
 * White text is guaranteed to remain visible on the returned color.
 *
 * @param name The entity name to derive a color from. Falsy/empty names fall
 *   back to a neutral hue so avatars never render without a background.
 */
export const entityColor = (name?: string | null): string => {
  const hue = name ? hashString(name) % 360 : 0;
  return hslToHex(hue, SATURATION, LIGHTNESS);
};
