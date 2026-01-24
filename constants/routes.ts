export const routeStringMap = {
  manage: "manage",
  dashboard: "dashboard",
  projects: "projects",
  addProject: "add-project",
  editProject: "edit-project",
  tasks: "tasks",
  addTask: "add-task",
  companies: "companies",
  addCompany: "add-company",
};

export const routes = {
  manage: {
    root: () => `/${routeStringMap.manage}`,
    dashboard: {
      root: () => `${routes.manage.root()}/${routeStringMap.dashboard}`,
    },
    projects: {
      root: () => `${routes.manage.root()}/${routeStringMap.projects}`,
      addProject: () =>
        `${routes.manage.projects.root()}/${routeStringMap.addProject}`,
      projectDetails: (projectId: string) =>
        `${routes.manage.projects.root()}/${projectId}`,
      editProject: (projectId: string) =>
        `${routes.manage.projects.projectDetails(projectId)}/${
          routeStringMap.editProject
        }`,
      tasks: {
        root: (projectId: string) =>
          `${routes.manage.projects.projectDetails(projectId)}/${
            routeStringMap.tasks
          }`,
        addTask: (projectId: string) =>
          `${routes.manage.projects.tasks.root(projectId)}/${
            routeStringMap.addTask
          }`,
      },
    },
    companies: {
      root: () => `${routes.manage.root()}/${routeStringMap.companies}`,
      addCompany: () =>
        `${routes.manage.companies.root()}/${routeStringMap.addCompany}`,
    },
    company: {
      root: (companyId: string) =>
        `${routes.manage.root()}/company/${companyId}`,
    },
  },
};
