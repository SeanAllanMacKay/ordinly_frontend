import React from "react";
import { Card } from "@/components";
import { useGetClientContactsQuery } from "@/api";
import { ContactType } from "@/api/entities/types";
import { ListableData } from "@/components/molecules/ListableData";
import { useDrawers } from "@/util/navigation/useDrawers";
import { usePermissionGate } from "@/util/permissions/usePermissionGate";
import { ClientContactsEmptyState } from "./ClientContactsEmptyState";

export const ClientContactsDataList = ({
  clientId,
}: {
  clientId: string;
}) => {
  const contactsQuery = useGetClientContactsQuery({ clientId });
  const { open } = useDrawers();
  const { isDenied, showDenied } = usePermissionGate({
    permission: "all_clients:update",
  });

  return (
    <ListableData
      // common
      entity="contacts"
      items={contactsQuery.data?.contacts ?? []}
      isLoading={contactsQuery.isLoading}
      isFetching={contactsQuery.isFetching}
      emptyState={<ClientContactsEmptyState />}
      onPressItem={(item: ContactType) =>
        isDenied ? showDenied() : open("edit-contact", { contactId: item.id })
      }
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
