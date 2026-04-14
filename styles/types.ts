import { FontSizes } from "./FontSizes";

export type EmphasisProp = "high" | "medium" | "low";
export type SizeProp = keyof typeof FontSizes;
export type ContentColorProp =
  | "onPrimary"
  | "onPrimaryContainer"
  | "onSecondaryContainer"
  | "onSecondary"
  | "onTertiary"
  | "onTertiaryContainer"
  | "error"
  | "onError"
  | "onErrorContainer"
  | "onBackground"
  | "onSurface"
  | "onSurfaceVariant"
  | "onSurfaceDisabled"
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline";
