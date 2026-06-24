import { POST, GET, PUT, REQUEST_ACTIONS } from "@/api/requests";

import { ProjectTaskKind, ProjectType, TaskType } from "../types";

export const projectRequests = {
  listProjects: async ({
    companyId,
    queryParams,
  }: {
    companyId: string;
    queryParams: { page: number };
  }) =>
    await GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      projects: ProjectType[];
    }>({
      endpoint: `/company/${companyId}/projects`,
      queryParams,
    }),

  listProjectPriorities: async ({ companyId }: { companyId: string }) =>
    await GET<{
      projectPriorities: {
        id: string;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: `/company/${companyId}/projects/priority` }),

  listProjectStatuses: async ({ companyId }: { companyId: string }) =>
    await GET<{
      projectStatuses: {
        id: string;
        name: string;
        description: string;
        color: string;
      }[];
    }>({ endpoint: `/company/${companyId}/projects/status` }),

  getProject: async ({
    companyId,
    projectId,
  }: {
    companyId: string;
    projectId: string;
  }) =>
    await GET<{
      project: ProjectType;
    }>({
      endpoint: `/company/${companyId}/projects/${projectId}`,
    }),

  createProject: async ({
    companyId,
    ...body
  }: {
    companyId: string;
    name: string;
    description?: string;
    status: string;
    priority: string;
    startDate?: Date;
    dueDate?: Date;
  }) =>
    await POST<{ project: ProjectType }>({
      endpoint: `/company/${companyId}/projects`,
      body,
    }),

  deleteProject: async () => {},

  editProject: async ({
    companyId,
    projectId,
    ...body
  }: {
    companyId: string;
    projectId: string;
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    startDate?: Date;
    dueDate?: Date;
  }) =>
    await PUT<{ project: ProjectType }>({
      endpoint: `/company/${companyId}/projects/${projectId}`,
      body,
    }),

  tasks: {
    listTasks: async ({
      companyId,
      projectId,
      page,
    }: {
      companyId: string;
      projectId: string;
      page: number;
    }) =>
      await GET<{
        page: number;
        totalPages: number;
        pageParam: number;
        tasks: TaskType[];
      }>({
        endpoint: `/company/${companyId}/projects/${projectId}/tasks`,
        queryParams: {
          page,
        },
      }),

    getTask: async ({
      companyId,
      projectId,
      taskId,
    }: {
      companyId: string;
      projectId: string;
      taskId: string;
    }) =>
      await GET<{
        message: string;
        task: TaskType;
      }>({
        endpoint: `/company/${companyId}/projects/${projectId}/tasks/${taskId}`,
      }),

    createTask: async ({
      companyId,
      projectId,
      ...body
    }: {
      companyId: string;
      projectId: string;
      type: ProjectTaskKind;
      name: string;
      description?: string;
      status?: string;
      priority?: string;
      startDate?: Date;
      dueDate?: Date;
      checklist?: string[];
    }) =>
      await POST<{ task: TaskType }>({
        endpoint: `/company/${companyId}/projects/${projectId}/tasks`,
        body,
      }),

    editTask: async ({
      companyId,
      projectId,
      taskId,
      ...body
    }: {
      companyId: string;
      taskId: string;
      projectId: string;
      name: string;
      description?: string;
      status?: string;
      priority?: string;
      startDate?: Date;
      dueDate?: Date;
    }) =>
      await PUT<{ task: TaskType }>({
        endpoint: `/company/${companyId}/projects/${projectId}/tasks/${taskId}`,
        body,
      }),

    deleteTask: async () => {},

    checklist: {
      updateChecklist: async ({
        companyId,
        projectId,
        taskId,
        ...body
      }: {
        companyId: string;
        projectId: string;
        taskId: string;
        items: { id: string; name: string; isComplete: boolean }[];
      }) =>
        await PUT<{ task: TaskType }>({
          endpoint: `/company/${companyId}/projects/${projectId}/tasks/${taskId}/checklist`,
          body,
        }),
    },

    documents: {
      getDocumentDownloadURL: async ({
        companyId,
        projectId,
        taskId,
        documentId,
      }: {
        companyId: string;
        projectId: string;
        taskId: string;
        documentId: string;
      }) =>
        await GET<{ downloadURL: string }>({
          endpoint: `/company/${companyId}/projects/${projectId}/tasks/${taskId}/documents/${documentId}/download-url`,
        }),
    },
  },
};

export const projectRequestKeys = {
  createProject: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.POST,
    "company",
    companyId,
    "projects",
  ],
  listProjects: ({
    companyId,
    page,
  }: { companyId?: string; page?: number } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "projects",
    "list",
    ...(page ? [page] : []),
  ],
  listProjectPriorities: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "projects",
    "priorities",
    "list",
  ],
  listProjectStatuses: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "projects",
    "status",
    "list",
  ],
  getProject: ({
    companyId,
    projectId,
  }: {
    companyId?: string;
    projectId: string;
  }) => [REQUEST_ACTIONS.GET, "company", companyId, "projects", projectId],
  editproject: ({
    companyId,
    projectId,
  }: {
    companyId?: string;
    projectId: string;
  }) => [REQUEST_ACTIONS.PUT, "company", companyId, "projects", projectId],
  deleteProject: ({
    companyId,
    projectId,
  }: {
    companyId?: string;
    projectId: string;
  }) => [REQUEST_ACTIONS.DELETE, "company", companyId, "projects", projectId],

  tasks: {
    listTasks: ({
      companyId,
      projectId,
      queryParams,
    }: {
      companyId?: string;
      projectId: string;
      queryParams?: { page: number };
    }) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "projects",
      projectId,
      "tasks",
      "list",
      ...(queryParams ? [queryParams] : []),
    ],
    getTask: ({
      companyId,
      projectId,
      taskId,
    }: {
      companyId?: string;
      projectId: string;
      taskId: string;
    }) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "projects",
      projectId,
      "tasks",
      taskId,
    ],
    createTask: ({
      companyId,
      projectId,
    }: {
      companyId?: string;
      projectId: string;
    }) => [
      REQUEST_ACTIONS.POST,
      "company",
      companyId,
      "projects",
      projectId,
      "tasks",
    ],
    editTask: ({
      companyId,
      projectId,
      taskId,
    }: {
      companyId?: string;
      projectId: string;
      taskId: string;
    }) => [
      REQUEST_ACTIONS.PUT,
      "company",
      companyId,
      "projects",
      projectId,
      "tasks",
      taskId,
    ],
    deleteTask: ({
      companyId,
      projectId,
      taskId,
    }: {
      companyId?: string;
      projectId: string;
      taskId: string;
    }) => [
      REQUEST_ACTIONS.DELETE,
      "company",
      companyId,
      "projects",
      projectId,
      "tasks",
      taskId,
    ],

    checklist: {
      updateChecklist: ({
        companyId,
        projectId,
        taskId,
      }: {
        companyId?: string;
        projectId: string;
        taskId: string;
      }) => [
        REQUEST_ACTIONS.PUT,
        "company",
        companyId,
        "projects",
        projectId,
        "tasks",
        taskId,
        "checklist",
      ],
    },
  },
};
