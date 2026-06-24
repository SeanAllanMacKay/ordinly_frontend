import React from "react";
import { Card } from "@/components";
import { useGetWorkersQuery } from "@/api";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { CompanyWorkersListEmptyState } from "./CompanyWorkersListEmptyState";

type WorkerRow = { id: string; name: string; roles: string };

export const CompanyWorkersList = () => {
  const { page, onPaginationChange } = usePagination();

  const workersQuery = useGetWorkersQuery({ page });

  const workers: WorkerRow[] = (workersQuery.data?.members ?? []).map(
    (worker) => ({
      id: worker.id,
      name: worker.user.name,
      roles: worker.roles.map((assignment) => assignment.role.name).join(", "),
    }),
  );

  return (
    <ListableData
      // common
      entity="workers"
      items={workers}
      isLoading={workersQuery.isLoading}
      isFetching={workersQuery.isFetching}
      emptyState={<CompanyWorkersListEmptyState />}
      pagination={{
        page,
        totalPages: workersQuery.data?.totalPages ?? 0,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: WorkerRow) => String(item.id)}
      item={({ item }: { item: WorkerRow }) => (
        <Card title={item.name} subtitle={item.roles} />
      )}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Roles", key: "roles" },
      ]}
    />
  );
};
