import { models } from "@/api-abstraction";
import { useQuery } from "@tanstack/react-query";
import { projectQueryKeys } from "./queryKeys";
import { UseQueryOptions } from "@tanstack/react-query";
import { PROJECT_PRIORITIES } from "@/constants/PROJECT_PRIORITIES";
import { PROJECT_STATUSES } from "@/constants/PROJECT_STATUSES";

export type PersonalProjectType = {
  createdAt: string;
  createdBy: string;
  description: string;
  documents: [];
  dueDate: string;
  name: string;
  owner: {
    variant: "user" | "company";
    id: string;
    _id: string;
  };
  priority: typeof PROJECT_PRIORITIES;
  startDate: string;
  status: typeof PROJECT_STATUSES;
  tasks: [];
  _id: string;
};

export type GetPersonalProjectResponse = { project: PersonalProjectType };

export const useGetPersonalProjectQuery = ({
  projectId,
  options,
}: {
  projectId: string;
  options?: Omit<
    UseQueryOptions<GetPersonalProjectResponse>,
    "queryKey" | "queryFn"
  >;
}) =>
  useQuery<GetPersonalProjectResponse>({
    queryKey: projectQueryKeys.personalProject(projectId),
    queryFn: () => models.Project.getProject({ projectId }),
    enabled: !!projectId,
    ...options,
  });
