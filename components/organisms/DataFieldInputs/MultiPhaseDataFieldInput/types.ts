import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiPhaseDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  projectId: string;
};
