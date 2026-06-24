import { Route } from "expo-router";

export const routeStringMap = {
  manage: "manage",
  personal: "personal",
  company: "company",
  projects: "projects",
  editProject: "edit-project",
  tasks: "tasks",
  companies: "companies",
  clients: "clients",
  people: "people",
  roles: "roles",
  teams: "teams",
  workers: "workers",
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
          editTask: (projectId: string, taskId: string) =>
            `${routes.manage.personal.projects.tasks.details(
              projectId,
              taskId,
            )}/edit-task`,
        },
      },
      clients: {
        root: () =>
          `${routes.manage.personal.root()}/${routeStringMap.clients}` as const,
        clientDetails: (clientId: string) =>
          `${routes.manage.personal.clients.root()}/${clientId}` as const,
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
      projects: {
        root: (companyId: string) =>
          `${routes.manage.company.root(companyId)}/${
            routeStringMap.projects
          }` as Route,
        projectDetails: (companyId: string, projectId: string) =>
          `${routes.manage.company.projects.root(companyId)}/${projectId}` as Route,
        editProject: (companyId: string, projectId: string) =>
          `${routes.manage.company.projects.projectDetails(
            companyId,
            projectId,
          )}/${routeStringMap.editProject}` as Route,
        tasks: {
          root: (companyId: string, projectId: string) =>
            `${routes.manage.company.projects.projectDetails(
              companyId,
              projectId,
            )}/${routeStringMap.tasks}` as Route,
          details: (companyId: string, projectId: string, taskId: string) =>
            `${routes.manage.company.projects.tasks.root(
              companyId,
              projectId,
            )}/${taskId}` as Route,
          editTask: (companyId: string, projectId: string, taskId: string) =>
            `${routes.manage.company.projects.tasks.details(
              companyId,
              projectId,
              taskId,
            )}/edit-task` as Route,
        },
      },
      clients: {
        root: (companyId: string) =>
          `${routes.manage.company.root(companyId)}/${
            routeStringMap.clients
          }` as Route,
        clientDetails: (companyId: string, clientId: string) =>
          `${routes.manage.company.clients.root(companyId)}/${clientId}` as Route,
      },
      people: {
        root: (companyId: string) =>
          `${routes.manage.company.root(companyId)}/${
            routeStringMap.people
          }` as Route,
        roles: (companyId: string) =>
          `${routes.manage.company.people.root(companyId)}/${
            routeStringMap.roles
          }` as Route,
        teams: (companyId: string) =>
          `${routes.manage.company.people.root(companyId)}/${
            routeStringMap.teams
          }` as Route,
        workers: (companyId: string) =>
          `${routes.manage.company.people.root(companyId)}/${
            routeStringMap.workers
          }` as Route,
      },
    },
  },
};
