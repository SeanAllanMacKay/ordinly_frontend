import { FormFieldProps } from "@/components/atoms/Form/types";

export type TaskPriorityDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
