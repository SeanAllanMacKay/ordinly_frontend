import React from "react";
import { Card } from "@/components";
import { useGetRolesQuery } from "@/api";
import { ListableData } from "@/components/molecules/ListableData";
import { CompanyRolesListEmptyState } from "./CompanyRolesListEmptyState";

type RoleRow = { id: string; name: string; description: string };

export const CompanyRolesList = () => {
  const rolesQuery = useGetRolesQuery();

  const roles: RoleRow[] = (rolesQuery.data?.roles ?? []).map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
  }));

  return (
    <ListableData
      // common
      entity="roles"
      items={roles}
      isLoading={rolesQuery.isLoading}
      isFetching={rolesQuery.isFetching}
      emptyState={<CompanyRolesListEmptyState />}
      // cards
      keyExtractor={(item: RoleRow) => String(item.id)}
      card={({ item }: { item: RoleRow }) => (
        <Card title={item.name} subtitle={item.description} />
      )}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
      ]}
    />
  );
};
