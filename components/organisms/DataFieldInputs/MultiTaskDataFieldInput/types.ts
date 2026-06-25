import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiTaskDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  projectId: string;
};
