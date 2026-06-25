import { FormFieldProps } from "@/components/atoms/Form/types";

export type TeamDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
