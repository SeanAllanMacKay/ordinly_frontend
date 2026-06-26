import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteClientContactMutation = ({
  clientId,
  contactId,
  onSuccess,
}: {
  clientId: string;
  contactId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.contacts.deleteContact>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.contacts.deleteContact({
      companyId,
      clientId,
      contactId,
    }),
    mutationFn: async () =>
      await clientRequests.contacts.deleteContact({
        companyId: companyId!,
        clientId,
        contactId,
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
