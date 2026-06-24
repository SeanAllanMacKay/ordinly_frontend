import { GET, POST, PUT, DELETE, REQUEST_ACTIONS } from "@/api/requests";

import { InvitationType, WorkerType } from "../types";

// NB: the BE exposes company members under `/users` (and pending invites under
// `/invitations`). The FE keeps the "worker" naming for the entity/UI, which
// maps to the "workers" permission group.
export const workerRequests = {
  listWorkers: async ({
    companyId,
    queryParams,
  }: {
    companyId: string;
    queryParams: { page: number };
  }) =>
    await GET<{
      members: WorkerType[];
      totalItems: number;
      totalPages: number;
    }>({
      endpoint: `/company/${companyId}/users`,
      queryParams,
    }),

  getWorker: async ({
    companyId,
    userId,
  }: {
    companyId: string;
    userId: string;
  }) =>
    await GET<{ member: WorkerType }>({
      endpoint: `/company/${companyId}/users/${userId}`,
    }),

  inviteWorker: async ({
    companyId,
    ...body
  }: {
    companyId: string;
    email: string;
    roleId: string;
  }) =>
    await POST<{ invitation?: InvitationType }>({
      endpoint: `/company/${companyId}/users`,
      body,
    }),

  // Replaces the member's entire role set ([] clears all).
  updateWorkerRoles: async ({
    companyId,
    userId,
    ...body
  }: {
    companyId: string;
    userId: string;
    roleIds: string[];
  }) =>
    await PUT({
      endpoint: `/company/${companyId}/users/${userId}`,
      body,
    }),

  removeWorker: async ({
    companyId,
    userId,
  }: {
    companyId: string;
    userId: string;
  }) =>
    await DELETE({
      endpoint: `/company/${companyId}/users/${userId}`,
    }),

  invitations: {
    listInvitations: async ({ companyId }: { companyId: string }) =>
      await GET<{ invitations: InvitationType[] }>({
        endpoint: `/company/${companyId}/invitations`,
      }),

    revokeInvitation: async ({
      companyId,
      invitationId,
    }: {
      companyId: string;
      invitationId: string;
    }) =>
      await DELETE({
        endpoint: `/company/${companyId}/invitations/${invitationId}`,
      }),
  },
};

export const workerRequestKeys = {
  listWorkers: ({
    companyId,
    page,
  }: { companyId?: string; page?: number } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "users",
    "list",
    ...(page ? [page] : []),
  ],
  getWorker: ({
    companyId,
    userId,
  }: {
    companyId?: string;
    userId: string;
  }) => [REQUEST_ACTIONS.GET, "company", companyId, "users", userId],
  inviteWorker: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.POST,
    "company",
    companyId,
    "users",
  ],
  updateWorkerRoles: ({
    companyId,
    userId,
  }: {
    companyId?: string;
    userId: string;
  }) => [REQUEST_ACTIONS.PUT, "company", companyId, "users", userId],
  removeWorker: ({
    companyId,
    userId,
  }: {
    companyId?: string;
    userId: string;
  }) => [REQUEST_ACTIONS.DELETE, "company", companyId, "users", userId],
  invitations: {
    listInvitations: ({ companyId }: { companyId?: string } = {}) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "invitations",
      "list",
    ],
    revokeInvitation: ({
      companyId,
      invitationId,
    }: {
      companyId?: string;
      invitationId: string;
    }) => [
      REQUEST_ACTIONS.DELETE,
      "company",
      companyId,
      "invitations",
      invitationId,
    ],
  },
};
