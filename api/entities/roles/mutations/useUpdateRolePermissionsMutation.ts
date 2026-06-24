import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useUpdateRolePermissionsMutation = ({
  roleId,
  onSuccess,
}: {
  roleId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof roleRequests.updateRolePermissions>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: roleRequestKeys.updateRolePermissions({ companyId, roleId }),
    mutationFn: (
      props: Omit<
        Parameters<typeof roleRequests.updateRolePermissions>[0],
        "companyId" | "roleId"
      >,
    ) =>
      roleRequests.updateRolePermissions({
        ...props,
        companyId: companyId!,
        roleId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: roleRequestKeys.listRolePermissions({ companyId, roleId }),
      });

      onSuccess?.(data);
    },
  });
};
