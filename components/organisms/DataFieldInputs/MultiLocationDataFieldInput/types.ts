import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiLocationDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
