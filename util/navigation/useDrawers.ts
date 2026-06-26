import { useRouter } from "expo-router";

// Drawer modals are driven by an appended `?drawer=<name>` query param rather
// than dedicated routes, so they open in place over the current screen from
// anywhere in the app. Add a name here for each modal wired into DrawerHost.
export type DrawerName =
  | "add-company"
  | "add-client"
  | "add-contact"
  | "add-project"
  | "add-role"
  | "add-team"
  | "add-worker"
  | "add-task"
  | "add-milestone"
  | "add-phase"
  | "edit-client"
  | "edit-contact"
  | "edit-team"
  | "edit-worker"
  | "edit-role";

// Ids of the entity an edit drawer targets. These are passed as query params
// (not route path params) so they can be set from list screens where the entity
// id isn't part of the URL path, and cleared together when the drawer closes.
type DrawerParams = Partial<{
  contactId: string;
  teamId: string;
  workerId: string;
  roleId: string;
}>;

export const useDrawers = () => {
  const router = useRouter();

  return {
    // Appends `?drawer=<name>` (plus any target id params) to the current URL —
    // does not navigate.
    open: (drawer: DrawerName, params?: DrawerParams) =>
      router.setParams({ drawer, ...params }),
    // Strips the drawer param and any target id params, closing the drawer and
    // returning to the base path.
    close: () =>
      router.setParams({
        drawer: undefined,
        contactId: undefined,
        teamId: undefined,
        workerId: undefined,
        roleId: undefined,
      }),
  };
};
