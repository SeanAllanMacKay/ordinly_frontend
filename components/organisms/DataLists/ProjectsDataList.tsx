import React from "react";
import { ProjectCard } from "@/components";
import { useGetProjectsQuery } from "@/api";
import { ProjectType } from "@/api/entities/projects/requests";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";

export const ProjectsDataList = () => {
  const { page, onPaginationChange } = usePagination();

  const projectsQuery = useGetProjectsQuery({ page });

  return (
    <ListableData
      // common
      entity="projects"
      items={projectsQuery.data?.projects ?? []}
      isLoading={projectsQuery.isLoading}
      isFetching={projectsQuery.isFetching}
      pagination={{
        page,
        totalPages: projectsQuery.data?.totalPages ?? 0,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: ProjectType) => String(item.id)}
      card={ProjectCard}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Status", key: "status", variant: "tag" },
        { label: "Priority", key: "priority", variant: "tag" },
        { label: "Start", key: "startDate", variant: "date" },
        { label: "Due", key: "dueDate", variant: "date" },
      ]}
    />
  );
};
