import { CompanyPermissionFlag } from "@/api/entities/types";
import { useCurrentCompany } from "@/util/navigation/useCurrentCompany";
import { useModals } from "@/util/navigation/useModals";

// Shown when a gated control is pressed without a more specific message.
export const DEFAULT_DENIED_MESSAGE =
  "You don't have permission to perform this action. If you believe you " +
  "should be able to, reach out to your account administrator to update " +
  "your permissions.";

// Central gating primitive shared by every permission-aware control. Reads the
// current company's RBAC flags and exposes whether the given permission is
// denied plus a handler that opens the permission-denied modal.
//
// `isDenied` is only true when the flag is explicitly `false`. While the
// company query is still loading (`permissions` undefined) we stay optimistic —
// the backend remains the real gate — so controls never flash a false denial.
// In personal context the user owns their personal company (`isOwner`), so
// every flag is `true` and nothing is denied.
export const usePermissionGate = ({
  permission,
  deniedMessage,
}: {
  permission?: CompanyPermissionFlag;
  deniedMessage?: string;
}) => {
  const { permissions } = useCurrentCompany();
  const { openPermissionDenied } = useModals();

  const isDenied = !!permission && permissions?.[permission] === false;

  const showDenied = () =>
    openPermissionDenied(deniedMessage ?? DEFAULT_DENIED_MESSAGE);

  return { isDenied, showDenied };
};
