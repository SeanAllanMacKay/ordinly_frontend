import { IconProps } from "../../Icon";
import { FormFieldInputProps } from "../../Form/types";

export type TagInputValueType = {
  label: string;
  value: string;
  color: string;
};

export type TagInputProps = FormFieldInputProps<string | undefined> & {
  options: TagInputValueType[];
  icon?: IconProps["name"];
};
