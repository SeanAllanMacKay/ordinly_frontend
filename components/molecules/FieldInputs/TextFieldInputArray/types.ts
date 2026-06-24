import { FormFieldArrayProps } from "@/components/atoms/Form/types";

export type TextFieldInputArrayProps = Omit<
  FormFieldArrayProps,
  "itemComponent" | "wrapper" | "isLoading" | "defaultItemValue"
>;
