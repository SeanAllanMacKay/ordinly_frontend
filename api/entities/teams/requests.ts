import { GET, POST, PUT, DELETE, REQUEST_ACTIONS } from "@/api/requests";

import { TeamType } from "../types";

export const teamRequests = {
  listTeams: async ({ companyId }: { companyId: string }) =>
    await GET<{ teams: TeamType[] }>({
      endpoint: `/company/${companyId}/teams`,
    }),

  getTeam: async ({
    companyId,
    teamId,
  }: {
    companyId: string;
    teamId: string;
  }) =>
    await GET<{ team: TeamType }>({
      endpoint: `/company/${companyId}/teams/${teamId}`,
    }),

  createTeam: async ({
    companyId,
    ...body
  }: {
    companyId: string;
    name: string;
    description?: string;
    memberIds?: string[];
  }) =>
    await POST<{ team: TeamType }>({
      endpoint: `/company/${companyId}/teams`,
      body,
    }),

  editTeam: async ({
    companyId,
    teamId,
    ...body
  }: {
    companyId: string;
    teamId: string;
    name?: string;
    description?: string;
    memberIds?: string[];
  }) =>
    await PUT<{ team: TeamType }>({
      endpoint: `/company/${companyId}/teams/${teamId}`,
      body,
    }),

  deleteTeam: async ({
    companyId,
    teamId,
  }: {
    companyId: string;
    teamId: string;
  }) =>
    await DELETE({
      endpoint: `/company/${companyId}/teams/${teamId}`,
    }),
};

export const teamRequestKeys = {
  listTeams: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "teams",
    "list",
  ],
  getTeam: ({ companyId, teamId }: { companyId?: string; teamId: string }) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "teams",
    teamId,
  ],
  createTeam: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.POST,
    "company",
    companyId,
    "teams",
  ],
  editTeam: ({ companyId, teamId }: { companyId?: string; teamId: string }) => [
    REQUEST_ACTIONS.PUT,
    "company",
    companyId,
    "teams",
    teamId,
  ],
  deleteTeam: ({
    companyId,
    teamId,
  }: {
    companyId?: string;
    teamId: string;
  }) => [REQUEST_ACTIONS.DELETE, "company", companyId, "teams", teamId],
};
