import { GET, REQUEST_ACTIONS } from "@/api/requests";

export const companyRequests = {
  listProjectPriorities: async ({
    queryParams,
  }: {
    queryParams: { companyId: string };
  }) =>
    await GET<{
      projectPriorities: {
        id: String;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/company/project-priorities", queryParams }),

  listProjectStatuses: async () =>
    await GET<{
      projectStatuses: {
        id: String;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/company/project-status" }),
};

export const companyRequestKeys = {
  listProjectPriorities: ({ companyId }: { companyId: string }) => [
    REQUEST_ACTIONS.GET,
    "company",
  ],
};
