import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetProjectPrioritiesQuery = () => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: projectRequestKeys.listProjectPriorities({ companyId }),
    queryFn: () =>
      projectRequests.listProjectPriorities({ companyId: companyId! }),
    enabled: !!companyId,
    select: ({ projectPriorities }) =>
      projectPriorities.map(({ id, name, color }) => ({
        value: id,
        label: name,
        color,
      })),
  });
};
