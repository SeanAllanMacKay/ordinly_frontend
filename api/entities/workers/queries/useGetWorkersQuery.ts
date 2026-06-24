import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetWorkersQuery = ({ page }: { page: number }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: workerRequestKeys.listWorkers({ companyId, page }),
    queryFn: async () => {
      return await workerRequests.listWorkers({
        companyId: companyId!,
        queryParams: { page },
      });
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
    retry: false,
  });
};
