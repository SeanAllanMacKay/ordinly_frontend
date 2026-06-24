import { GET, POST, PUT, DELETE, REQUEST_ACTIONS } from "@/api/requests";

import {
  PermissionCatalogEntryType,
  RolePermissionType,
  RoleType,
} from "../types";

type PermissionScope = "company" | "project";

export const roleRequests = {
  listRoles: async ({ companyId }: { companyId: string }) =>
    await GET<{ roles: RoleType[] }>({
      endpoint: `/company/${companyId}/roles`,
    }),

  listPermissionCatalog: async ({
    companyId,
    queryParams,
  }: {
    companyId: string;
    queryParams?: { scope: PermissionScope };
  }) =>
    await GET<{ permissions: PermissionCatalogEntryType[] }>({
      endpoint: `/company/${companyId}/roles/catalog`,
      queryParams,
    }),

  getRole: async ({
    companyId,
    roleId,
  }: {
    companyId: string;
    roleId: string;
  }) =>
    await GET<{ role: RoleType }>({
      endpoint: `/company/${companyId}/roles/${roleId}`,
    }),

  createRole: async ({
    companyId,
    ...body
  }: {
    companyId: string;
    name: string;
    description?: string;
  }) =>
    await POST<{ role: RoleType }>({
      endpoint: `/company/${companyId}/roles`,
      body,
    }),

  editRole: async ({
    companyId,
    roleId,
    ...body
  }: {
    companyId: string;
    roleId: string;
    name?: string;
    description?: string;
  }) =>
    await PUT<{ role: RoleType }>({
      endpoint: `/company/${companyId}/roles/${roleId}`,
      body,
    }),

  deleteRole: async ({
    companyId,
    roleId,
  }: {
    companyId: string;
    roleId: string;
  }) =>
    await DELETE({
      endpoint: `/company/${companyId}/roles/${roleId}`,
    }),

  listRolePermissions: async ({
    companyId,
    roleId,
    queryParams,
  }: {
    companyId: string;
    roleId: string;
    queryParams?: { scope: PermissionScope };
  }) =>
    await GET<{ permissions: RolePermissionType[] }>({
      endpoint: `/company/${companyId}/roles/${roleId}/permissions`,
      queryParams,
    }),

  updateRolePermissions: async ({
    companyId,
    roleId,
    ...body
  }: {
    companyId: string;
    roleId: string;
    scope: PermissionScope;
    permissions: { permissionId: string; levelId: string }[];
  }) =>
    await PUT<{ assignments: unknown }>({
      endpoint: `/company/${companyId}/roles/${roleId}/permissions`,
      body,
    }),
};

export const roleRequestKeys = {
  listRoles: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "roles",
    "list",
  ],
  listPermissionCatalog: ({
    companyId,
    scope,
  }: { companyId?: string; scope?: PermissionScope } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "roles",
    "catalog",
    ...(scope ? [scope] : []),
  ],
  getRole: ({ companyId, roleId }: { companyId?: string; roleId: string }) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "roles",
    roleId,
  ],
  createRole: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.POST,
    "company",
    companyId,
    "roles",
  ],
  editRole: ({ companyId, roleId }: { companyId?: string; roleId: string }) => [
    REQUEST_ACTIONS.PUT,
    "company",
    companyId,
    "roles",
    roleId,
  ],
  deleteRole: ({
    companyId,
    roleId,
  }: {
    companyId?: string;
    roleId: string;
  }) => [REQUEST_ACTIONS.DELETE, "company", companyId, "roles", roleId],
  listRolePermissions: ({
    companyId,
    roleId,
    scope,
  }: {
    companyId?: string;
    roleId: string;
    scope?: PermissionScope;
  }) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "roles",
    roleId,
    "permissions",
    ...(scope ? [scope] : []),
  ],
  updateRolePermissions: ({
    companyId,
    roleId,
  }: {
    companyId?: string;
    roleId: string;
  }) => [
    REQUEST_ACTIONS.PUT,
    "company",
    companyId,
    "roles",
    roleId,
    "permissions",
  ],
};
