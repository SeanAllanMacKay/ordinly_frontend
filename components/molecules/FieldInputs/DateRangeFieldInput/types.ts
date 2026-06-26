import { DateRangeInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type DateRangeFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<DateRangeInputProps, "min" | "max" | "startLabel" | "endLabel">;
