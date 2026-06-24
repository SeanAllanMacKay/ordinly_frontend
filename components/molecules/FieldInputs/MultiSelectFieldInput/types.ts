import { MultiSelectInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiSelectFieldInputProps<ValueType> = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<MultiSelectInputProps<ValueType>, "options">;
