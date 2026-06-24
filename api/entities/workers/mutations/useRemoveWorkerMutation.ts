import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useRemoveWorkerMutation = ({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof workerRequests.removeWorker>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: workerRequestKeys.removeWorker({ companyId, userId }),
    mutationFn: () =>
      workerRequests.removeWorker({ companyId: companyId!, userId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.listWorkers({ companyId, page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
