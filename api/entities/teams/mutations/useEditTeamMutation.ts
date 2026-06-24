import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamRequests, teamRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useEditTeamMutation = ({
  teamId,
  onSuccess,
}: {
  teamId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof teamRequests.editTeam>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: teamRequestKeys.editTeam({ companyId, teamId }),
    mutationFn: (
      props: Omit<
        Parameters<typeof teamRequests.editTeam>[0],
        "companyId" | "teamId"
      >,
    ) => teamRequests.editTeam({ ...props, companyId: companyId!, teamId }),
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
