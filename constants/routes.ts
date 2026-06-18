export const routeStringMap = {
  manage: "manage",
  dashboard: "dashboard",
  projects: "projects",
  addProject: "add-project",
  editProject: "edit-project",
  tasks: "tasks",
  addTask: "add-task",
  addMilestone: "add-milestone",
  addPhase: "add-phase",
  companies: "companies",
  addCompany: "add-company",
} as const;

export const routes = {
  manage: {
    root: () => `/${routeStringMap.manage}` as const,
    dashboard: {
      root: () =>
        `${routes.manage.root()}/${routeStringMap.dashboard}` as const,
    },
    projects: {
      root: () => `${routes.manage.root()}/${routeStringMap.projects}` as const,
      addProject: () =>
        `${routes.manage.projects.root()}/${routeStringMap.addProject}` as const,
      projectDetails: (projectId: string) =>
        `${routes.manage.projects.root()}/${projectId}` as const,
      editProject: (projectId: string) =>
        `${routes.manage.projects.projectDetails(projectId)}/${
          routeStringMap.editProject
        }` as const,
      tasks: {
        root: (projectId: string) =>
          `${routes.manage.projects.projectDetails(projectId)}/${
            routeStringMap.tasks
          }` as const,
        details: (projectId: string, taskId: string) =>
          `${routes.manage.projects.tasks.root(projectId)}/${taskId}`,
        addTask: (projectId: string) =>
          `${routes.manage.projects.tasks.root(projectId)}/${
            routeStringMap.addTask
          }` as const,
        addMilestone: (projectId: string) =>
          `${routes.manage.projects.tasks.root(projectId)}/${
            routeStringMap.addMilestone
          }` as const,
        addPhase: (projectId: string) =>
          `${routes.manage.projects.tasks.root(projectId)}/${
            routeStringMap.addPhase
          }` as const,
        editTask: (projectId: string, taskId: string) =>
          `${routes.manage.projects.tasks.details(projectId, taskId)}/edit-task`,
      },
    },
    companies: {
      root: () =>
        `${routes.manage.root()}/${routeStringMap.companies}` as const,
      addCompany: () =>
        `${routes.manage.companies.root()}/${routeStringMap.addCompany}` as const,
    },
    company: {
      root: (companyId: string) =>
        `${routes.manage.root()}/company/${companyId}` as const,
    },
  },
};
