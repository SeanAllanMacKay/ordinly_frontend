import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleRequests, roleRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useCreateRoleMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof roleRequests.createRole>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();
  const companyId = useActiveCompanyId();

  return useMutation({
    mutationKey: roleRequestKeys.createRole({ companyId }),
    mutationFn: (
      body: Omit<Parameters<typeof roleRequests.createRole>[0], "companyId">,
    ) => roleRequests.createRole({ ...body, companyId: companyId! }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: roleRequestKeys.listRoles({ companyId }),
      });

      onSuccess?.(data);
    },
  });
};
