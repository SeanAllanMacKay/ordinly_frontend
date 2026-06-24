import { TagInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type TagFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<TagInputProps, "options" | "icon">;
