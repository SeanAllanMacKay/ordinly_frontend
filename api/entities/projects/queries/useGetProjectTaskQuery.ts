import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { projectRequestKeys, projectRequests } from "../requests";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const useGetProjectTaskQuery = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  const companyId = useActiveCompanyId();

  return useQuery({
    queryKey: projectRequestKeys.tasks.getTask({
      companyId,
      projectId,
      taskId,
    }),
    queryFn: async () => {
      return await projectRequests.tasks.getTask({
        companyId: companyId!,
        projectId,
        taskId,
      });
    },
    enabled: !!companyId,
    placeholderData: keepPreviousData,
    retry: false,
  });
};
