import { useQuery } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetRolePermissionsQuery = ({
  roleId,
  scope,
}: {
  roleId: string;
  scope?: "company" | "project";
}) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: roleRequestKeys.listRolePermissions({ companyId, roleId, scope }),
    queryFn: async () => {
      return await roleRequests.listRolePermissions({
        companyId: companyId!,
        roleId,
        queryParams: scope ? { scope } : undefined,
      });
    },
    enabled: !!companyId && !!roleId,
    retry: false,
  });
};
