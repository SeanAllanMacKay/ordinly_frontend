import { requests } from "../";

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  status?: string;
  priority?: string;
  tasks?: { taskId: string; assignees?: string[] }[];
  owner: { variant: string; id: string };
  createdBy: string;
  documents?: string[];
  createdAt: Date;
  startDate?: Date;
  dueDate?: Date;
  updatedAt?: Date;
};

export const Project = {
  listProjects: async ({ page }: { page: number }) =>
    await requests.GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      projects: ProjectType[];
    }>({
      endpoint: `/user/project`,
      queryParams: {
        page,
      },
    }),

  getProject: async ({ projectId }: { projectId: string }) =>
    await requests.GET<{
      project: ProjectType;
    }>({
      endpoint: `/user/project/${projectId}`,
    }),

  createProject: async (body: {
    name: string;
    description?: string;
    status: string;
    priority: string;
    startDate?: Date;
    dueDate?: Date;
  }) =>
    await requests.POST<{ project: ProjectType }>({
      endpoint: "/user/project",
      body,
    }),

  deleteProject: async () => {},

  editProject: async ({
    projectId,
    ...body
  }: {
    projectId: string;
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    startDate?: Date;
    dueDate?: Date;
  }) =>
    await requests.PUT<{ project: ProjectType }>({
      endpoint: `/user/project/${projectId}`,
      body,
    }),

  tasks: {
    listTasks: async ({
      projectId,
      page,
    }: {
      projectId: string;
      page: number;
    }) =>
      await requests.GET<{
        page: number;
        totalPages: number;
        pageParam: number;
        projects: ProjectType[];
      }>({
        endpoint: `/user/project/${projectId}/task`,
        queryParams: {
          page,
        },
      }),

    createTask: async ({
      projectId,
      ...body
    }: {
      projectId: string;
      name: string;
      description?: string;
      status: string;
      priority: string;
      startDate?: Date;
      dueDate?: Date;
    }) =>
      await requests.POST<{ project: ProjectType }>({
        endpoint: `/user/project/${projectId}/task`,
        body,
      }),
  },
};
