import { FormFieldProps } from "@/components/atoms/Form/types";

export type ProjectStatusDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading" | "label"
>;
