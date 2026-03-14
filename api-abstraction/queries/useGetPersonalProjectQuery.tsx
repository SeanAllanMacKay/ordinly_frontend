import { models } from "@/api-abstraction";
import { useQuery } from "@tanstack/react-query";
import { projectQueryKeys } from "./queryKeys";
import { UseQueryOptions } from "@tanstack/react-query";

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
  };
  startDate: string;
  tasks: [];
  id: string;
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
