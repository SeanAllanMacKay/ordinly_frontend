import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiWorkerDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
