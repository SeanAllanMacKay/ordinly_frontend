import { FormFieldInputProps } from "../Form/types";

export type TextInputProps = {
  type?: "text" | "password" | "multiline";
  onPress?: () => void;
} & (
  | ({
      isEditable?: true;
    } & FormFieldInputProps<string>)
  | ({
      isEditable?: false;
    } & Partial<FormFieldInputProps<string>>)
);
