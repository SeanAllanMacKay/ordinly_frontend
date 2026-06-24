import { FormFieldProps } from "@/components/atoms/Form/types";

export type PhoneNumberFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
