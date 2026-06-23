import React from "react";
import { useGetProjectTasksQuery } from "@/api";
import { TaskType } from "@/api/entities/projects/requests";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { useGlobalSearchParams } from "expo-router";
import { TaskCard } from "../../Cards/TaskCard";

export const ProjectTasksDataList = () => {
  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const { page, onPaginationChange } = usePagination();

  const projectTasksQuery = useGetProjectTasksQuery({ projectId, page });

  return (
    <ListableData
      //common
      entity="tasks"
      items={projectTasksQuery.data?.tasks ?? []}
      isLoading={projectTasksQuery.isLoading}
      isFetching={projectTasksQuery.isFetching}
      pagination={{
        page,
        totalPages: projectTasksQuery.data?.totalPages ?? 0,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: TaskType) => String(item.id)}
      card={TaskCard}
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
