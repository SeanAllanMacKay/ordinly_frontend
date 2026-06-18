import { IconProps } from "../Icon";

export type TagInputValueType = {
  label: string;
  value: string;
  color: string;
};

export type TagInputProps = {
  label: string;
  options: TagInputValueType[];
  value?: TagInputValueType;
  onChange: (value: TagInputValueType) => void;
  icon?: IconProps["name"];
};
