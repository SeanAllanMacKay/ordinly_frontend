import { Route, useGlobalSearchParams, useSegments } from "expo-router";
import { routes } from "@/constants/routes";

// Projects live in BOTH route trees — `/personal/projects/...` and
// `/company/:companyId/projects/...` — and share the same screens, list
// queries, and forms. The screens are context-agnostic (they read
// `projectId`/`taskId` from search params), but the hrefs/redirects they build
// must point back into whichever tree the user is currently in.
//
// This hook mirrors `useActiveCompanyId`'s context detection and returns a
// uniform set of route builders (taking only `projectId`/`taskId`, with the
// `companyId` baked in). Call sites stay identical regardless of context:
//   const projectRoutes = useProjectRoutes();
//   projectRoutes.projectDetails(projectId); // personal or company route
//
// Results are coerced to `Route` so both branches expose an identical shape and
// the values satisfy expo-router's `Href` (the personal builders return
// `as const` literals, which are not assignable to `Href` on their own).
export const useProjectRoutes = () => {
  const segments = useSegments() as string[];
  const { companyId } = useGlobalSearchParams<{ companyId?: string }>();

  if (segments?.includes("company") && companyId) {
    const company = routes.manage.company.projects;

    return {
      root: (): Route => company.root(companyId),
      projectDetails: (projectId: string): Route =>
        company.projectDetails(companyId, projectId),
      editProject: (projectId: string): Route =>
        company.editProject(companyId, projectId),
      tasks: {
        root: (projectId: string): Route =>
          company.tasks.root(companyId, projectId),
        details: (projectId: string, taskId: string): Route =>
          company.tasks.details(companyId, projectId, taskId),
        editTask: (projectId: string, taskId: string): Route =>
          company.tasks.editTask(companyId, projectId, taskId),
      },
    };
  }

  const personal = routes.manage.personal.projects;

  return {
    root: (): Route => personal.root() as Route,
    projectDetails: (projectId: string): Route =>
      personal.projectDetails(projectId) as Route,
    editProject: (projectId: string): Route =>
      personal.editProject(projectId) as Route,
    tasks: {
      root: (projectId: string): Route => personal.tasks.root(projectId) as Route,
      details: (projectId: string, taskId: string): Route =>
        personal.tasks.details(projectId, taskId) as Route,
      editTask: (projectId: string, taskId: string): Route =>
        personal.tasks.editTask(projectId, taskId) as Route,
    },
  };
};
