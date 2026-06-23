import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetProjectStatusesQuery = () => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: projectRequestKeys.listProjectStatuses({ companyId }),
    queryFn: () =>
      projectRequests.listProjectStatuses({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ projectStatuses }) =>
      projectStatuses.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
