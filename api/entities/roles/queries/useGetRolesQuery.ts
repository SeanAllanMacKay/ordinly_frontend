import { useQuery } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetRolesQuery = () => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: roleRequestKeys.listRoles({ companyId }),
    queryFn: async () => {
      return await roleRequests.listRoles({ companyId: companyId! });
    },
    enabled: !!companyId,
    retry: false,
  });
};
