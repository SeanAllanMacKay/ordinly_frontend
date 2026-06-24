import { DateInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type DateFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<DateInputProps, "min" | "max">;
