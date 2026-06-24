import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyRequests, companyRequestKeys } from "../requests";

export const useDeleteCompanyMutation = ({
  companyId,
  onSuccess,
}: {
  companyId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof companyRequests.deleteCompany>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: companyRequestKeys.deleteCompany({ companyId }),
    mutationFn: () => companyRequests.deleteCompany({ companyId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: companyRequestKeys.listCompanies({ page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
