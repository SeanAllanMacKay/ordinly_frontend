import { CompanyPermissionFlag } from "@/api/entities/types";
import { FormFieldInputProps } from "../../Form/types";

export type ToggleInputProps = FormFieldInputProps<boolean> & {
  // When set, the toggle is gated on this RBAC flag: if the current company
  // lacks it, pressing shows the permission-denied modal instead of toggling.
  permission?: CompanyPermissionFlag;
  deniedMessage?: string;
};
