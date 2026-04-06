import { POST, GET, PUT, REQUEST_ACTIONS } from "@/api/requests";
import { AddProjectTaskFormFieldTypes } from "@/components";

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  status?: { id: string; name: string; color: string };
  priority?: { id: string; name: string; color: string };
  tasks?: { taskId: string; assignees?: string[] }[];
  owner: { variant: string; id: string };
  createdBy: string;
  documents?: string[];
  createdAt: Date;
  startDate?: Date;
  dueDate?: Date;
  updatedAt?: Date;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status?: { id: string; name: string; color: string };
  priority?: { id: string; name: string; color: string };
  startDate?: Date;
  dueDate?: Date;
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

  listProjectPriorities: async () =>
    await GET<{
      projectPriorities: {
        id: String;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/projects/priority" }),

  listProjectStatuses: async () =>
    await GET<{
      projectStatuses: {
        id: string;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: "/projects/status" }),

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
        tasks: TaskType[];
      }>({
        endpoint: `/projects/${projectId}/tasks`,
        queryParams: {
          page,
        },
      }),

    getTask: async ({
      projectId,
      taskId,
    }: {
      projectId: string;
      taskId: string;
    }) =>
      await GET<{
        message: string;
        task: TaskType;
      }>({
        endpoint: `/projects/${projectId}/tasks/${taskId}`,
      }),

    createTask: async ({
      projectId,
      ...body
    }: {
      projectId: string;
      name: string;
      description?: string;
      status?: string;
      priority?: string;
      startDate?: Date;
      dueDate?: Date;
      checklist?: string[];
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
  listProjects: ({ page }: { page: number }) => [
    REQUEST_ACTIONS.GET,
    "projects",
    "list",
    page,
  ],
  listProjectPriorities: () => [
    REQUEST_ACTIONS.GET,
    "projects",
    "priorities",
    "list",
  ],
  listProjectStatuses: () => [
    REQUEST_ACTIONS.GET,
    "projects",
    "status",
    "list",
  ],
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
    listTasks: ({
      projectId,
      queryParams,
    }: {
      projectId: string;
      queryParams?: { page: number };
    }) => [
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
    createTask: ({ projectId }: { projectId: string }) => [
      REQUEST_ACTIONS.POST,
      "projects",
      projectId,
      "tasks",
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
