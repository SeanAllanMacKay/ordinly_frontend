import { models } from "@/api-abstraction";
import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { projectQueryKeys } from "./queryKeys";
import { TASK_PRIORITIES } from "@/constants/TASK_PRIORITIES";
import { TASK_STATUSES } from "@/constants/TASK_STATUSES";

export type PersonalProjectTaskType = {
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
  priority: typeof TASK_PRIORITIES;
  startDate: string;
  status: typeof TASK_STATUSES;
  checklist: [];
  id: string;
};

export type GetPersonalProjectTasksResponse = {
  page: number;
  totalItems: number;
  totalPage: number;
  tasks: PersonalProjectTaskType[];
};

export const useGetPersonalProjectTasksQuery = ({
  projectId,
  options,
}: {
  projectId: string;
  options?: Omit<
    DefinedInitialDataInfiniteOptions<GetPersonalProjectTasksResponse>,
    "queryKey" | "queryFn"
  >;
}) =>
  useInfiniteQuery<GetPersonalProjectTasksResponse>({
    queryKey: projectQueryKeys.personalProjectTasks(projectId),
    queryFn: ({ pageParam = 1 }) =>
      models.Project.tasks.listTasks({ projectId, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages?.length >= lastPage.totalPages) {
        return;
      }

      return lastPage.page + 1;
    },
    getPreviousPageParam: (prevPage) => {
      if (prevPage.page === 1) {
        return;
      }

      return prevPage.page - 1;
    },
    enabled: !!projectId,
    ...options,
  });
