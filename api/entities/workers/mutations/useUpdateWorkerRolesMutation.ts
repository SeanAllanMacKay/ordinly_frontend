import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useUpdateWorkerRolesMutation = ({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof workerRequests.updateWorkerRoles>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: workerRequestKeys.updateWorkerRoles({ companyId, userId }),
    mutationFn: (
      props: Omit<
        Parameters<typeof workerRequests.updateWorkerRoles>[0],
        "companyId" | "userId"
      >,
    ) =>
      workerRequests.updateWorkerRoles({
        ...props,
        companyId: companyId!,
        userId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.listWorkers({ companyId, page: 1 }),
      });
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.getWorker({ companyId, userId }),
      });

      onSuccess?.(data);
    },
  });
};
