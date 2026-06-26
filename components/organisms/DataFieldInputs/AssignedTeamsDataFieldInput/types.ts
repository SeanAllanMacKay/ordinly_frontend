import { FormFieldProps } from "@/components/atoms/Form/types";

// Teams (with their members) are scoped to the active company via
// `useGetTeamsQuery`, so no `companyId` prop is needed here.
export type AssignedTeamsDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
>;
