import { useQuery } from "@tanstack/react-query";
import { teamRequests, teamRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetTeamQuery = ({ teamId }: { teamId: string }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: teamRequestKeys.getTeam({ companyId, teamId }),
    queryFn: async () => {
      return await teamRequests.getTeam({ companyId: companyId!, teamId });
    },
    enabled: !!companyId && !!teamId,
    retry: false,
  });
};
