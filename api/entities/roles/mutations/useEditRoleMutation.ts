import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useEditRoleMutation = ({
  roleId,
  onSuccess,
}: {
  roleId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof roleRequests.editRole>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: roleRequestKeys.editRole({ companyId, roleId }),
    mutationFn: (
      props: Omit<
        Parameters<typeof roleRequests.editRole>[0],
        "companyId" | "roleId"
      >,
    ) => roleRequests.editRole({ ...props, companyId: companyId!, roleId }),
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
