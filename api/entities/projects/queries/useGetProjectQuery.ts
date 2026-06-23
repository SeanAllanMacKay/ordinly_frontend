import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetProjectQuery = ({ projectId }: { projectId: string }) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: projectRequestKeys.getProject({ companyId, projectId }),
    queryFn: () => projectRequests.getProject({ companyId: companyId!, projectId }),
    enabled: !!companyId && !!projectId,
  });
};
