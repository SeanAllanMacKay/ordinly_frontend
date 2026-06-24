import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamRequests, teamRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteTeamMutation = ({
  teamId,
  onSuccess,
}: {
  teamId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof teamRequests.deleteTeam>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: teamRequestKeys.deleteTeam({ companyId, teamId }),
    mutationFn: () =>
      teamRequests.deleteTeam({ companyId: companyId!, teamId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: teamRequestKeys.listTeams({ companyId }),
      });
      queryClient.invalidateQueries({
        queryKey: teamRequestKeys.getTeam({ companyId, teamId }),
      });

      onSuccess?.(data);
    },
  });
};
