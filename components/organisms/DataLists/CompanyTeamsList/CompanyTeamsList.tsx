import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components";
import { useGetTeamsQuery } from "@/api";
import { ListableData } from "@/components/molecules/ListableData";
import { CompanyTeamsListEmptyState } from "./CompanyTeamsListEmptyState";

type TeamRow = { id: string; name: string; members: string };

export const CompanyTeamsList = () => {
  const { t } = useTranslation("companies");
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
      item={({ item }: { item: TeamRow }) => (
        <Card
          title={item.name}
          subtitle={t("teams.memberCount", { count: Number(item.members) })}
        />
      )}
      // table
      columns={[
        { label: t("name"), key: "name" },
        { label: t("teams.columnMembers"), key: "members" },
      ]}
    />
  );
};
