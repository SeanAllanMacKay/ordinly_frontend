import { useGlobalSearchParams, useSegments } from "expo-router";
import { useGetCurrentUserQuery } from "@/api/entities/users/queries/useGetCurrentUserQuery";

// Every project request is now company-scoped (`/company/:companyId/...`). The
// backend owns all projects via companies — personal projects belong to the
// user's auto-created "personal" company. This hook resolves which company the
// current request targets:
// - In the `/company/...` route tree → the `companyId` route param.
// - In the `/personal/...` route tree → the user's `personalCompany.id`.
// Returns `undefined` while the current user query is still loading (or a
// company route hasn't populated its param yet), so callers should guard.
export const useActiveCompanyId = (): string | undefined => {
  const segments = useSegments() as string[];
  const { companyId } = useGlobalSearchParams<{ companyId?: string }>();
  const userQuery = useGetCurrentUserQuery();
  const personalCompanyId = userQuery.data?.user?.personalCompany?.id;

  return segments?.includes("company") ? companyId : personalCompanyId;
};
