import { Route } from "expo-router";

export const routeStringMap = {
  manage: "manage",
  personal: "personal",
  company: "company",
  projects: "projects",
  editProject: "edit-project",
  tasks: "tasks",
  addTask: "add-task",
  addMilestone: "add-milestone",
  addPhase: "add-phase",
  companies: "companies",
  clients: "clients",
  people: "people",
  settings: "settings",
} as const;

export const routes = {
  manage: {
    root: () => `/${routeStringMap.manage}` as const,
    personal: {
      root: () =>
        `${routes.manage.root()}/${routeStringMap.personal}` as const,
      projects: {
        root: () =>
          `${routes.manage.personal.root()}/${routeStringMap.projects}` as const,
        projectDetails: (projectId: string) =>
          `${routes.manage.personal.projects.root()}/${projectId}` as const,
        editProject: (projectId: string) =>
          `${routes.manage.personal.projects.projectDetails(projectId)}/${
            routeStringMap.editProject
          }` as const,
        tasks: {
          root: (projectId: string) =>
            `${routes.manage.personal.projects.projectDetails(projectId)}/${
              routeStringMap.tasks
            }` as const,
          details: (projectId: string, taskId: string) =>
            `${routes.manage.personal.projects.tasks.root(projectId)}/${taskId}`,
          addTask: (projectId: string) =>
            `${routes.manage.personal.projects.tasks.root(projectId)}/${
              routeStringMap.addTask
            }` as const,
          addMilestone: (projectId: string) =>
            `${routes.manage.personal.projects.tasks.root(projectId)}/${
              routeStringMap.addMilestone
            }` as const,
          addPhase: (projectId: string) =>
            `${routes.manage.personal.projects.tasks.root(projectId)}/${
              routeStringMap.addPhase
            }` as const,
          editTask: (projectId: string, taskId: string) =>
            `${routes.manage.personal.projects.tasks.details(
              projectId,
              taskId,
            )}/edit-task`,
        },
      },
      companies: {
        root: () =>
          `${routes.manage.personal.root()}/${
            routeStringMap.companies
          }` as Route,
      },
    },
    company: {
      root: (companyId: string) =>
        `${routes.manage.root()}/${routeStringMap.company}/${companyId}` as Route,
    },
  },
};
