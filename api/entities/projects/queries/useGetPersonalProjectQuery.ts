import { useQuery } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useGetProjectQuery = ({ projectId }: { projectId: string }) =>
  useQuery({
    queryKey: projectRequestKeys.getProject({ projectId }),
    queryFn: () => projectRequests.getProject({ projectId }),
    enabled: !!projectId,
  });
