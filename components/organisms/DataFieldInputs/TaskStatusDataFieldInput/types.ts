import { FormFieldProps } from "@/components/atoms/Form/types";

export type TaskStatusDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
