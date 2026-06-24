import { TextInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type TextFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<TextInputProps, "type" | "isEditable" | "isAutoFocus">;
