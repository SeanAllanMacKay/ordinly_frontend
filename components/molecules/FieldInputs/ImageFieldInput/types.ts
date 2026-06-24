import { FormFieldProps } from "@/components/atoms/Form/types";

export type ImageFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
