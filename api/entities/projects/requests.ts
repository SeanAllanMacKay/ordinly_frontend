import { POST, GET, PUT, REQUEST_ACTIONS } from "@/api/requests";

export type ProjectType = {
  _id: string;
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

export const projectRequests = {
  listProjects: async ({ queryParams }: { queryParams: { page: number } }) =>
    await GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      projects: ProjectType[];
    }>({
      endpoint: `/projects`,
      queryParams,
    }),

  getProject: async ({ projectId }: { projectId: string }) =>
    await GET<{
      project: ProjectType;
    }>({
      endpoint: `/projects/${projectId}`,
    }),

  createProject: async (body: {
    name: string;
    description?: string;
    status: string;
    priority: string;
    startDate?: Date;
    dueDate?: Date;
  }) =>
    await POST<{ project: ProjectType }>({
      endpoint: "/projects",
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
    await PUT<{ project: ProjectType }>({
      endpoint: `/projects/${projectId}`,
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
      await GET<{
        page: number;
        totalPages: number;
        pageParam: number;
        projects: ProjectType[];
      }>({
        endpoint: `/projects/${projectId}/tasks`,
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
      await POST<{ project: ProjectType }>({
        endpoint: `/projects/${projectId}/tasks`,
        body,
      }),

    editTask: async () => {},

    deleteTask: async () => {},
  },
};

export const projectRequestKeys = {
  createProject: () => [REQUEST_ACTIONS.POST, "projects"],
  listProjects: () => [REQUEST_ACTIONS.GET, "projects", "list"],
  getProject: ({ projectId }: { projectId: string }) => [
    REQUEST_ACTIONS.GET,
    "projects",
    projectId,
  ],
  editproject: ({ projectId }: { projectId: string }) => [
    REQUEST_ACTIONS.PUT,
    "projects",
    projectId,
  ],
  deleteProject: ({ projectId }: { projectId: string }) => [
    REQUEST_ACTIONS.DELETE,
    "projects",
    projectId,
  ],

  tasks: {
    listTasks: ({ projectId, queryParams }: any) => [
      REQUEST_ACTIONS.GET,
      "projects",
      projectId,
      "tasks",
      "list",
      queryParams,
    ],
    getTask: ({ projectId, taskId }: { projectId: string; taskId: string }) => [
      REQUEST_ACTIONS.GET,
      "projects",
      projectId,
      "tasks",
      taskId,
    ],
    editTask: ({
      projectId,
      taskId,
    }: {
      projectId: string;
      taskId: string;
    }) => [REQUEST_ACTIONS.PUT, "projects", projectId, "tasks", taskId],
    deleteTask: ({
      projectId,
      taskId,
    }: {
      projectId: string;
      taskId: string;
    }) => [REQUEST_ACTIONS.DELETE, "projects", projectId, "tasks", taskId],
  },
};
