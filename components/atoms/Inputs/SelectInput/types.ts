import { FormFieldInputProps } from "../../Form/types";
import { IconProps } from "../../Icon";
import { TextInputProps } from "../TextInput/types";

export type SelectInputProps<ValueType> = FormFieldInputProps<ValueType> & {
  options: Array<{ value: ValueType; label: string; color?: string }>;
  icon?: IconProps["name"];
  isDense?: TextInputProps["isDense"];
};
