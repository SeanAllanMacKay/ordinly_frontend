import { useQuery } from "@tanstack/react-query";
import { workerRequests, workerRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetWorkerQuery = ({ userId }: { userId: string }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: workerRequestKeys.getWorker({ companyId, userId }),
    queryFn: async () => {
      return await workerRequests.getWorker({ companyId: companyId!, userId });
    },
    enabled: !!companyId && !!userId,
    retry: false,
  });
};
