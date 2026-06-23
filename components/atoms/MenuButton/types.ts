import { SizeProp } from "@/styles/types";
import { ButtonProps } from "../Button/types";
import { IconProps } from "../Icon";

export type MenuButtonProps = Pick<
  ButtonProps,
  | "label"
  | "icon"
  | "isLoading"
  | "isDisabled"
  | "isSkeleton"
  | "mode"
  | "variant"
> & {
  options: {
    label?: string;
    onPress: () => void;
    icon?: IconProps["name"];
    size?: SizeProp;
    isActive?: boolean;
  }[];
};
