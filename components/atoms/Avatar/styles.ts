import { SizeProp } from "@/styles/types";
import { AvatarSize } from "./types";

/** Pixel dimensions of the square avatar per size token. */
export const AVATAR_DIMENSIONS: Record<AvatarSize, number> = {
  sm: 24,
  md: 40,
  lg: 64,
};

/** Typography size used for the fallback initials per avatar size. */
export const AVATAR_INITIALS_SIZE: Record<AvatarSize, SizeProp> = {
  sm: "xs",
  md: "sm",
  lg: "lg",
};

/** Fraction of the dimension used as the corner radius for rounded squares. */
export const AVATAR_ROUNDED_SQUARE_RADIUS_RATIO = 0.2;
