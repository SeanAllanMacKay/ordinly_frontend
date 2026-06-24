import React from "react";
import { Card } from "@/components";
import { useGetClientContactsQuery } from "@/api";
import { ContactType } from "@/api/entities/types";
import { ListableData } from "@/components/molecules/ListableData";
import { ClientContactsEmptyState } from "./ClientContactsEmptyState";

export const ClientContactsDataList = ({
  clientId,
}: {
  clientId: string;
}) => {
  const contactsQuery = useGetClientContactsQuery({ clientId });

  return (
    <ListableData
      // common
      entity="contacts"
      items={contactsQuery.data?.contacts ?? []}
      isLoading={contactsQuery.isLoading}
      isFetching={contactsQuery.isFetching}
      emptyState={<ClientContactsEmptyState />}
      // cards
      keyExtractor={(item: ContactType) => String(item.id)}
      item={({ item }: { item: ContactType }) => (
        <Card title={item.name} subtitle={item.role} />
      )}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Role", key: "role" },
      ]}
    />
  );
};
