import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useDeleteRoleMutation = ({
  roleId,
  onSuccess,
}: {
  roleId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof roleRequests.deleteRole>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: roleRequestKeys.deleteRole({ companyId, roleId }),
    mutationFn: () =>
      roleRequests.deleteRole({ companyId: companyId!, roleId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: roleRequestKeys.listRoles({ companyId }),
      });
      queryClient.invalidateQueries({
        queryKey: roleRequestKeys.getRole({ companyId, roleId }),
      });

      onSuccess?.(data);
    },
  });
};
