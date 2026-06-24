import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useEditClientMutation = ({
  clientId,
  onSuccess,
}: {
  clientId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.editClient>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.editClient({ companyId, clientId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof clientRequests.editClient>[0],
        "clientId" | "companyId"
      >,
    ) =>
      await clientRequests.editClient({
        ...props,
        companyId: companyId!,
        clientId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.getClient({ companyId, clientId }),
      });

      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.listClients({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
