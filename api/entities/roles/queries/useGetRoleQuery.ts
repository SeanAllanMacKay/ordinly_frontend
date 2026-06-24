import { useQuery } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetRoleQuery = ({ roleId }: { roleId: string }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: roleRequestKeys.getRole({ companyId, roleId }),
    queryFn: async () => {
      return await roleRequests.getRole({ companyId: companyId!, roleId });
    },
    enabled: !!companyId && !!roleId,
    retry: false,
  });
};
