import { KeyboardTypeOptions } from "react-native";
import { FormFieldInputProps } from "../../Form/types";
import { IconProps } from "../../Icon";

export type TextInputProps = {
  type?: "text" | "password" | "multiline" | "stealth" | "select";
  onPress?: () => void;
  onClear?: () => void;
  isAutoFocus?: boolean;
  icon?: IconProps["name"];
  isDense?: boolean;
  keyboardType?: KeyboardTypeOptions;
} & (
  | ({
      isEditable?: true;
    } & FormFieldInputProps<string>)
  | ({
      isEditable?: false;
    } & Partial<FormFieldInputProps<string>>)
);
