import { AssignedUsersInputProps } from "@/components/atoms";
import { FormFieldProps } from "@/components/atoms/Form/types";

export type AssignedUsersFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> &
  Pick<AssignedUsersInputProps, "options" | "placeholder" | "modalTitle">;
