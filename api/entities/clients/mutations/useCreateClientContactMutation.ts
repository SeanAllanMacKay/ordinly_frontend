import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateClientContactMutation = ({
  clientId,
  onSuccess,
}: {
  clientId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.contacts.createContact>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.contacts.createContact({
      companyId,
      clientId,
    }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof clientRequests.contacts.createContact>[0],
        "clientId" | "companyId"
      >,
    ) =>
      await clientRequests.contacts.createContact({
        ...props,
        companyId: companyId!,
        clientId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.contacts.listContacts({
          companyId,
          clientId,
        }),
      });

      onSuccess?.(data);
    },
  });
};
