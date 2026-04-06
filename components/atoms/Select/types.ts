import { FormFieldInputProps } from "../Form/types";

export type SelectProps<ValueType> = FormFieldInputProps<ValueType> & {
  options: Array<{ value: ValueType; label: string; color?: string }>;
};
