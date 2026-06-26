import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteClientMutation = ({
  clientId,
  onSuccess,
}: {
  clientId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.deleteClient>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.deleteClient({ companyId, clientId }),
    mutationFn: async () =>
      await clientRequests.deleteClient({ companyId: companyId!, clientId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.listClients({ companyId, page: 1 }),
      });

      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.getClient({ companyId, clientId }),
      });

      onSuccess?.(data);
    },
  });
};
