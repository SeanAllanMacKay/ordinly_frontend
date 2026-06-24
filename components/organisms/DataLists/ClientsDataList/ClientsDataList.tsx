import React from "react";
import { ClientListItem } from "@/components";
import { useGetClientsQuery } from "@/api";
import { ClientType } from "@/api/entities/types";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { ClientsEmptyState } from "./ClientsEmptyState";

export const ClientsDataList = () => {
  const { page, onPaginationChange } = usePagination();

  const clientsQuery = useGetClientsQuery({ page });

  return (
    <ListableData
      // common
      entity="clients"
      items={clientsQuery.data?.clients ?? []}
      isLoading={clientsQuery.isLoading}
      isFetching={clientsQuery.isFetching}
      emptyState={<ClientsEmptyState />}
      pagination={{
        page,
        totalPages: clientsQuery.data?.totalPages ?? 0,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: ClientType) => String(item.id)}
      item={ClientListItem}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
      ]}
    />
  );
};
