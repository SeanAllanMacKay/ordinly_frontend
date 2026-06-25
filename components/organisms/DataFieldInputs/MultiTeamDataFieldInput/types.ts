import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiTeamDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
