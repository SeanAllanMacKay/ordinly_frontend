import { useSegments } from "expo-router";
import { useActiveCompanyId } from "./useActiveCompanyId";
import { useGetCompanyQuery } from "@/api/entities/companies/queries/useGetCompanyQuery";

// Resolves the company for the current URL (personal vs. company route trees)
// and fetches it with the current user's RBAC permission flags. Use this to
// gate actions: `permissions["workers:update"]`.
//
// `companyId` is `undefined` while the current-user query loads; the underlying
// query is guarded (`enabled: !!companyId`), so callers should guard on
// `permissions` (or `isLoading`) before reading flags.
export const useCurrentCompany = () => {
  const segments = useSegments() as string[];
  const companyId = useActiveCompanyId();
  const isPersonal = !segments?.includes("company");

  const query = useGetCompanyQuery({ companyId });

  return {
    company: query.data?.company,
    permissions: query.data?.permissions,
    companyId,
    isPersonal,
    isLoading: query.isLoading,
  };
};
