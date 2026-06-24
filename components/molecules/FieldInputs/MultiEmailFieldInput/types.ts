import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiEmailFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
