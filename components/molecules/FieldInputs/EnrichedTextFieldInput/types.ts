import { FormFieldProps } from "@/components/atoms/Form/types";

export type EnrichedTextFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
