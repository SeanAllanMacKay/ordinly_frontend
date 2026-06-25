import { FormFieldProps } from "@/components/atoms/Form/types";

export type ContactDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  clientId: string;
};
