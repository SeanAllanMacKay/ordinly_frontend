import { FormFieldProps } from "@/components/atoms/Form/types";

export type TaskDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  projectId: string;
};
