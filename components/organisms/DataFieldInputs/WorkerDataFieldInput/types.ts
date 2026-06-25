import { FormFieldProps } from "@/components/atoms/Form/types";

export type WorkerDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  companyId: string;
};
