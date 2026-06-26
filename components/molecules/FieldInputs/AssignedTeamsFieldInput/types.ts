import { AssignedTeamsInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type AssignedTeamsFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<AssignedTeamsInputProps, "options" | "placeholder" | "modalTitle">;
