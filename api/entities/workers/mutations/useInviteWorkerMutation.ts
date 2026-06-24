import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useInviteWorkerMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof workerRequests.inviteWorker>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: workerRequestKeys.inviteWorker({ companyId }),
    mutationFn: (
      body: Omit<Parameters<typeof workerRequests.inviteWorker>[0], "companyId">,
    ) => workerRequests.inviteWorker({ ...body, companyId: companyId! }),
    onSuccess: (data) => {
      // An invite either adds an existing user (members list changes) or creates
      // a pending invitation — invalidate both surfaces.
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.listWorkers({ companyId, page: 1 }),
      });
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.invitations.listInvitations({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
