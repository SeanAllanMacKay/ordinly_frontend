import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateClientMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.createClient>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.createClient({ companyId }),
    mutationFn: (
      body: Omit<Parameters<typeof clientRequests.createClient>[0], "companyId">,
    ) => clientRequests.createClient({ ...body, companyId: companyId! }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.listClients({ companyId, page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
