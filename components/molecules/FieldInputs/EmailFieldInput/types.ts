import { TextInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type EmailFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<TextInputProps, "isAutoFocus">;
