import { Route, useGlobalSearchParams, useSegments } from "expo-router";
import { routes } from "@/constants/routes";

// Clients live in BOTH route trees — `/personal/clients/...` and
// `/company/:companyId/clients/...` — and share the same screens, list queries,
// and forms. The screens are context-agnostic (they read `clientId` from search
// params), but the hrefs/redirects they build must point back into whichever
// tree the user is currently in.
//
// This hook mirrors `useActiveCompanyId`'s context detection and returns a
// uniform set of route builders (taking only `clientId`, with the `companyId`
// baked in). Call sites stay identical regardless of context:
//   const clientRoutes = useClientRoutes();
//   clientRoutes.clientDetails(clientId); // personal or company route
//
// Results are coerced to `Route` so both branches expose an identical shape and
// the values satisfy expo-router's `Href` (the personal builders return
// `as const` literals, which are not assignable to `Href` on their own).
export const useClientRoutes = () => {
  const segments = useSegments() as string[];
  const { companyId } = useGlobalSearchParams<{ companyId?: string }>();

  if (segments?.includes("company") && companyId) {
    const company = routes.manage.company.clients;

    return {
      root: (): Route => company.root(companyId),
      clientDetails: (clientId: string): Route =>
        company.clientDetails(companyId, clientId),
    };
  }

  const personal = routes.manage.personal.clients;

  return {
    root: (): Route => personal.root() as Route,
    clientDetails: (clientId: string): Route =>
      personal.clientDetails(clientId) as Route,
  };
};
