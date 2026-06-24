import { FormFieldProps } from "@/components/atoms/Form/types";

export type MultiPhoneNumberFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
