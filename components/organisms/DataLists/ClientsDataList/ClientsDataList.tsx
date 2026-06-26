import React from "react";
import { useRouter } from "expo-router";
import { ClientListItem } from "@/components";
import { useGetClientsQuery } from "@/api";
import { ClientType } from "@/api/entities/types";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { useClientRoutes } from "@/util/navigation/useClientRoutes";
import { ClientsEmptyState } from "./ClientsEmptyState";

export const ClientsDataList = () => {
  const { page, onPaginationChange } = usePagination();
  const router = useRouter();
  const clientRoutes = useClientRoutes();

  const clientsQuery = useGetClientsQuery({ page });

  return (
    <ListableData
      // common
      entity="clients"
      items={clientsQuery.data?.clients ?? []}
      isLoading={clientsQuery.isLoading}
      isFetching={clientsQuery.isFetching}
      emptyState={<ClientsEmptyState />}
      onPressItem={(item: ClientType) =>
        router.navigate(clientRoutes.clientDetails(item.id))
      }
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
