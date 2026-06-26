import { AvatarShape, AvatarSize } from "@/components/atoms";

export type AvatarStackItem = {
  name: string;
  imageURL?: string;
};

export type AvatarStackProps = {
  items: AvatarStackItem[];
  /** Maximum number of avatars to render before collapsing into a "+N" bubble. */
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
};
