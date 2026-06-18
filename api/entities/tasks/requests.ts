import { GET, REQUEST_ACTIONS } from "@/api/requests";

export const taskRequests = {
  listTaskPriorities: async () =>
    await GET<{
      taskPriorities: {
        id: string;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/task/priority" }),

  listTaskStatuses: async () =>
    await GET<{
      taskStatuses: {
        id: string;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/task/status" }),
};

export const taskRequestKeys = {
  listTaskPriorities: () => [REQUEST_ACTIONS.GET, "task", "priorities", "list"],
  listTaskStatuses: () => [REQUEST_ACTIONS.GET, "task", "status", "list"],
};
