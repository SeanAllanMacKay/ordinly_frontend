import { FormFieldArrayProps } from "@/components/atoms/Form/types";

export type ChecklistFieldInputArrayProps = Omit<
  FormFieldArrayProps,
  "itemComponent" | "wrapper" | "isLoading"
> & {
  labelKey: string;
  valueKey: string;
};
