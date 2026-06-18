import { type ImageProps as RNImageProps } from "react-native";

export type ImageProps = Pick<
  RNImageProps,
  "source" | "onLoad" | "onError" | "onLoadEnd" | "onLoadStart"
> & {
  variant?: "profile-picture" | "company-logo";
  size?: "sm" | "md" | "lg";
};
