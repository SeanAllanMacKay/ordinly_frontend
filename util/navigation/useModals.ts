import { useRouter } from "expo-router";

// Confirmation modals are driven by an appended `?modal=<name>` query param
// rather than dedicated routes, so they open in place over the current screen
// from anywhere in the app. Add a name here for each modal wired into ModalHost.
export type ModalName =
  | "confirm-delete-project"
  | "confirm-delete-company"
  | "confirm-delete-task"
  | "confirm-delete-account"
  | "permission-denied";

export const useModals = () => {
  const router = useRouter();

  return {
    // Appends `?modal=<name>` to the current URL — does not navigate.
    open: (modal: ModalName) => router.setParams({ modal }),
    // Opens the shared permission-denied modal, carrying the message to show.
    openPermissionDenied: (deniedMessage: string) =>
      router.setParams({ modal: "permission-denied", deniedMessage }),
    // Strips the params, closing the modal and returning to the base path.
    close: () =>
      router.setParams({ modal: undefined, deniedMessage: undefined }),
  };
};
