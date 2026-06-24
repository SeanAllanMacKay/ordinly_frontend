import { useQuery } from "@tanstack/react-query";
import { teamRequests, teamRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetTeamsQuery = () => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: teamRequestKeys.listTeams({ companyId }),
    queryFn: async () => {
      return await teamRequests.listTeams({ companyId: companyId! });
    },
    enabled: !!companyId,
    retry: false,
  });
};
