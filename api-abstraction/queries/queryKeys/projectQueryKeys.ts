export const projectQueryKeys = {
  personalProjects: () => ["projects", "personal"] as const,
  personalProject: (projectId: string) =>
    ["projects", "personal", projectId] as const,
  personalProjectTasks: (projectId: string) =>
    ["projects", "personal", projectId, "tasks"] as const,
};
