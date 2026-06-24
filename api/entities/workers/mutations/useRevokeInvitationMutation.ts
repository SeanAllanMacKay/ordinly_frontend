import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useRevokeInvitationMutation = ({
  invitationId,
  onSuccess,
}: {
  invitationId: string;
  onSuccess?: (
    data: Awaited<
      ReturnType<typeof workerRequests.invitations.revokeInvitation>
    >,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: workerRequestKeys.invitations.revokeInvitation({
      companyId,
      invitationId,
    }),
    mutationFn: () =>
      workerRequests.invitations.revokeInvitation({
        companyId: companyId!,
        invitationId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: workerRequestKeys.invitations.listInvitations({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
