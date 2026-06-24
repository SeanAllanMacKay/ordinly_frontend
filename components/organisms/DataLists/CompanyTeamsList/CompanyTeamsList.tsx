import React from "react";
import { Card } from "@/components";
import { useGetTeamsQuery } from "@/api";
import { ListableData } from "@/components/molecules/ListableData";
import { CompanyTeamsListEmptyState } from "./CompanyTeamsListEmptyState";

type TeamRow = { id: string; name: string; members: string };

export const CompanyTeamsList = () => {
  const teamsQuery = useGetTeamsQuery();

  const teams: TeamRow[] = (teamsQuery.data?.teams ?? []).map((team) => ({
    id: team.id,
    name: team.name,
    members: `${team.members.length}`,
  }));

  return (
    <ListableData
      // common
      entity="teams"
      items={teams}
      isLoading={teamsQuery.isLoading}
      isFetching={teamsQuery.isFetching}
      emptyState={<CompanyTeamsListEmptyState />}
      // cards
      keyExtractor={(item: TeamRow) => String(item.id)}
      card={({ item }: { item: TeamRow }) => (
        <Card title={item.name} subtitle={`${item.members} members`} />
      )}
      // table
      columns={[
        { label: "Name", key: "name" },
        { label: "Members", key: "members" },
      ]}
    />
  );
};
