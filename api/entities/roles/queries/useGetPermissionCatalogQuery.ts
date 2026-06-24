import { useQuery } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetPermissionCatalogQuery = ({
  scope,
}: {
  scope?: "company" | "project";
} = {}) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: roleRequestKeys.listPermissionCatalog({ companyId, scope }),
    queryFn: async () => {
      return await roleRequests.listPermissionCatalog({
        companyId: companyId!,
        queryParams: scope ? { scope } : undefined,
      });
    },
    enabled: !!companyId,
    retry: false,
  });
};
