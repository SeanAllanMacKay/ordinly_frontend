import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiProjectDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
