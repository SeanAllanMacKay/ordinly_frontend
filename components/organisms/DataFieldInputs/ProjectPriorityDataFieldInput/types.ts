import { FormFieldProps } from "@/components/atoms/Form/types";

export type ProjectPriorityDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
