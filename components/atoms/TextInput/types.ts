import { FormFieldInputProps } from "../Form/types";
import { IconProps } from "../Icon";

export type TextInputProps = {
  type?: "text" | "password" | "multiline" | "stealth" | "select";
  onPress?: () => void;
  isAutoFocus?: boolean;
  icon?: IconProps["name"];
  isDense?: boolean;
} & (
  | ({
      isEditable?: true;
    } & FormFieldInputProps<string>)
  | ({
      isEditable?: false;
    } & Partial<FormFieldInputProps<string>>)
);
