import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyRequests, companyRequestKeys } from "../requests";

export const useCreateCompanyMutation = ({
  onSuccess,
}: {
  onSuccess?: (
    data: Awaited<ReturnType<typeof companyRequests.createCompany>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: companyRequestKeys.createCompany(),
    mutationFn: companyRequests.createCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: companyRequestKeys.listCompanies({ page: 1 }),
      });

      onSuccess?.(data);
    },
  });
};
