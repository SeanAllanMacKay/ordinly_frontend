import { FormFieldProps } from "@/components/atoms/Form/types";

export type AssignedUsersDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
