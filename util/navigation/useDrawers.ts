import { useRouter } from "expo-router";

// Drawer modals are driven by an appended `?drawer=<name>` query param rather
// than dedicated routes, so they open in place over the current screen from
// anywhere in the app. Add a name here for each modal wired into DrawerHost.
export type DrawerName =
  | "add-company"
  | "add-project"
  | "add-role"
  | "add-team"
  | "add-worker"
  | "add-task"
  | "add-milestone"
  | "add-phase";

export const useDrawers = () => {
  const router = useRouter();

  return {
    // Appends `?drawer=<name>` to the current URL — does not navigate.
    open: (drawer: DrawerName) => router.setParams({ drawer }),
    // Strips the param, closing the drawer and returning to the base path.
    close: () => router.setParams({ drawer: undefined }),
  };
};
