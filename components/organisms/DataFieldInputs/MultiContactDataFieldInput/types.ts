import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiContactDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
  clientId: string;
};
