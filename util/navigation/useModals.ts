import { useRouter } from "expo-router";

// Confirmation modals are driven by an appended `?modal=<name>` query param
// rather than dedicated routes, so they open in place over the current screen
// from anywhere in the app. Add a name here for each modal wired into ModalHost.
export type ModalName =
  | "confirm-delete-project"
  | "confirm-delete-company"
  | "confirm-delete-task"
  | "confirm-delete-account"
  | "confirm-delete-client"
  | "confirm-delete-contact"
  | "confirm-delete-team"
  | "confirm-delete-worker"
  | "confirm-delete-role"
  | "change-password"
  | "permission-denied";

// Ids of the entity a confirmation modal targets. Passed as query params (not
// route path params) so they can be set from list screens / edit drawers and
// cleared together when the modal closes.
type ModalParams = Partial<{
  contactId: string;
  teamId: string;
  workerId: string;
  roleId: string;
}>;

export const useModals = () => {
  const router = useRouter();

  return {
    // Appends `?modal=<name>` (plus any target id params) to the current URL —
    // does not navigate.
    open: (modal: ModalName, params?: ModalParams) =>
      router.setParams({ modal, ...params }),
    // Opens the shared permission-denied modal, carrying the message to show.
    openPermissionDenied: (deniedMessage: string) =>
      router.setParams({ modal: "permission-denied", deniedMessage }),
    // Strips the params, closing the modal and returning to the base path.
    close: () =>
      router.setParams({
        modal: undefined,
        deniedMessage: undefined,
        contactId: undefined,
        teamId: undefined,
        workerId: undefined,
        roleId: undefined,
      }),
  };
};
