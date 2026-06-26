import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components";
import { useGetWorkersQuery } from "@/api";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { useDrawers } from "@/util/navigation/useDrawers";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";
import { CompanyWorkersListEmptyState } from "./CompanyWorkersListEmptyState";

type WorkerRow = { id: string; userId: string; name: string; roles: string };

export const CompanyWorkersList = () => {
  const { t } = useTranslation("companies");
  const { page, onPaginationChange } = usePagination();
  const { open } = useDrawers();
  const { isDenied, showDenied } = usePermissionGate({
    permission: "workers:update",
  });

  const workersQuery = useGetWorkersQuery({ page });

  const workers: WorkerRow[] = (workersQuery.data?.members ?? []).map(
    (worker) => ({
      id: worker.id,
      userId: worker.userId,
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
      onPressItem={(item: WorkerRow) =>
        isDenied ? showDenied() : open("edit-worker", { workerId: item.userId })
      }
      // cards
      keyExtractor={(item: WorkerRow) => String(item.id)}
      item={({ item }: { item: WorkerRow }) => (
        <Card title={item.name} subtitle={item.roles} />
      )}
      // table
      columns={[
        { label: t("name"), key: "name" },
        { label: t("workers.columnRoles"), key: "roles" },
      ]}
    />
  );
};
