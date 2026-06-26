import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientRequests, clientRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useEditClientContactMutation = ({
  clientId,
  contactId,
  onSuccess,
}: {
  clientId: string;
  contactId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof clientRequests.contacts.editContact>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: clientRequestKeys.contacts.editContact({
      companyId,
      clientId,
      contactId,
    }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof clientRequests.contacts.editContact>[0],
        "clientId" | "companyId" | "contactId"
      >,
    ) =>
      await clientRequests.contacts.editContact({
        ...props,
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

      queryClient.invalidateQueries({
        queryKey: clientRequestKeys.contacts.getContact({
          companyId,
          clientId,
          contactId,
        }),
      });

      onSuccess?.(data);
    },
  });
};
