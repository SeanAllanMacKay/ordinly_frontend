import { FormFieldProps } from "@/components/atoms/Form/types";

export type CheckboxFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
