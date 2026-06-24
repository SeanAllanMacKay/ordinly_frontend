import { SelectInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type SelectFieldInputProps<ValueType> = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<SelectInputProps<ValueType>, "options">;
