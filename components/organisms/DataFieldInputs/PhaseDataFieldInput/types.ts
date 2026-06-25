import { FormFieldProps } from "@/components/atoms/Form/types";

export type PhaseDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  projectId: string;
};
