import { FormFieldProps } from "@/components/atoms/Form/types";

export type FileFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
