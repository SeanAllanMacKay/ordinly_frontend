import React from "react";
import { DataList, ProjectCard } from "@/components";
import { useGetProjectsQuery } from "@/api";
import { ProjectType } from "@/api/entities/projects/requests";
import { routes } from "@/constants/routes";

const dataExtractor = (
  data: NonNullable<
    ReturnType<typeof useGetProjectsQuery>["data"]
  >["pages"][number]
) => data?.projects ?? [];

export const ProjectsDataList = () => {
  const projectsQuery = useGetProjectsQuery();

  return (
    <DataList<ProjectType, ReturnType<typeof useGetProjectsQuery>>
      entities="projects"
      query={projectsQuery}
      dataExtractor={dataExtractor}
      // card
      card={({ item }) => (
        <ProjectCard
          key={item._id}
          item={item}
          href={routes.manage.projects.projectDetails(item._id)}
        />
      )}
      keyExtractor={(item) => item._id}
      //table
      columns={[
        { key: "name", label: "Name" },
        { key: "status", label: "Status", variant: "tag" },
        { key: "priority", label: "Priority", variant: "tag" },
      ]}
      getHref={(item: ProjectType) =>
        routes.manage.projects.projectDetails(item._id)
      }
    />
  );
};
