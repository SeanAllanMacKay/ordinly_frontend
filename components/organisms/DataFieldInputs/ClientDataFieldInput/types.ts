import { FormFieldProps } from "@/components/atoms/Form/types";

export type ClientDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
