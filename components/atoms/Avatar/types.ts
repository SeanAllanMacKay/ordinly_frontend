export type AvatarSize = "sm" | "md" | "lg";

export type AvatarShape = "circle" | "rounded-square";

export type AvatarProps = {
  name: string;
  imageURL?: string;
  size?: AvatarSize;
  shape: AvatarShape;
};
