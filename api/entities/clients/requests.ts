import { POST, GET, PUT, DELETE, REQUEST_ACTIONS } from "@/api/requests";

import { ClientType, ContactType, OptionType } from "../types";

// Repeatable contact-detail inputs accepted by the client/contact create &
// update endpoints. Modelled from the OpenAPI request bodies; not all are wired
// into the UI yet (the add forms currently send scalar fields only).
type PhoneNumberInput = { number: string; type?: string; description?: string };
type EmailInput = { email: string; type?: string; description?: string };
type LocationInput = {
  address: string;
  name?: string;
  zoneIdentifier?: string;
  city?: string;
  region?: string;
  country?: string;
  type?: string;
  latitude?: string;
  longitude?: string;
  description?: string;
};
type ContactInput = {
  name: string;
  role?: string;
  description?: string;
  phoneNumbers?: PhoneNumberInput[];
  emails?: EmailInput[];
  locations?: LocationInput[];
};

export const clientRequests = {
  listClients: async ({
    companyId,
    queryParams,
  }: {
    companyId: string;
    queryParams: { page: number };
  }) =>
    await GET<{
      page: number;
      totalPages: number;
      pageParam: number;
      clients: ClientType[];
    }>({
      endpoint: `/company/${companyId}/clients`,
      queryParams,
    }),

  getClient: async ({
    companyId,
    clientId,
  }: {
    companyId: string;
    clientId: string;
  }) =>
    await GET<{
      client: ClientType;
    }>({
      endpoint: `/company/${companyId}/clients/${clientId}`,
    }),

  createClient: async ({
    companyId,
    ...body
  }: {
    companyId: string;
    name: string;
    description?: string;
    clientCompanyId?: string;
    clientUserId?: string;
    contacts?: ContactInput[];
    userIds?: string[];
    teamIds?: string[];
    phoneNumbers?: PhoneNumberInput[];
    emails?: EmailInput[];
    locations?: LocationInput[];
  }) =>
    await POST<{ client: ClientType }>({
      endpoint: `/company/${companyId}/clients`,
      body,
    }),

  editClient: async ({
    companyId,
    clientId,
    ...body
  }: {
    companyId: string;
    clientId: string;
    name?: string;
    description?: string;
    clientCompanyId?: string;
    clientUserId?: string;
    userIds?: string[];
    teamIds?: string[];
    phoneNumbers?: PhoneNumberInput[];
    emails?: EmailInput[];
    locations?: LocationInput[];
  }) =>
    await PUT<{ client: ClientType }>({
      endpoint: `/company/${companyId}/clients/${clientId}`,
      body,
    }),

  deleteClient: async ({
    companyId,
    clientId,
  }: {
    companyId: string;
    clientId: string;
  }) =>
    await DELETE({
      endpoint: `/company/${companyId}/clients/${clientId}`,
    }),

  listClientOptions: async ({ companyId }: { companyId: string }) =>
    await GET<{ options: OptionType[] }>({
      endpoint: `/company/${companyId}/clients/options`,
    }),

  contacts: {
    listContactOptions: async ({
      companyId,
      clientId,
    }: {
      companyId: string;
      clientId: string;
    }) =>
      await GET<{ options: OptionType[] }>({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts/options`,
      }),

    listContacts: async ({
      companyId,
      clientId,
    }: {
      companyId: string;
      clientId: string;
    }) =>
      await GET<{
        contacts: ContactType[];
      }>({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts`,
      }),

    getContact: async ({
      companyId,
      clientId,
      contactId,
    }: {
      companyId: string;
      clientId: string;
      contactId: string;
    }) =>
      await GET<{
        contact: ContactType;
      }>({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts/${contactId}`,
      }),

    createContact: async ({
      companyId,
      clientId,
      ...body
    }: {
      companyId: string;
      clientId: string;
      name: string;
      role?: string;
      description?: string;
      phoneNumbers?: PhoneNumberInput[];
      emails?: EmailInput[];
      locations?: LocationInput[];
    }) =>
      await POST<{ contact: ContactType }>({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts`,
        body,
      }),

    editContact: async ({
      companyId,
      clientId,
      contactId,
      ...body
    }: {
      companyId: string;
      clientId: string;
      contactId: string;
      name?: string;
      role?: string;
      description?: string;
      phoneNumbers?: PhoneNumberInput[];
      emails?: EmailInput[];
      locations?: LocationInput[];
    }) =>
      await PUT<{ contact: ContactType }>({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts/${contactId}`,
        body,
      }),

    deleteContact: async ({
      companyId,
      clientId,
      contactId,
    }: {
      companyId: string;
      clientId: string;
      contactId: string;
    }) =>
      await DELETE({
        endpoint: `/company/${companyId}/clients/${clientId}/contacts/${contactId}`,
      }),
  },
};

export const clientRequestKeys = {
  createClient: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.POST,
    "company",
    companyId,
    "clients",
  ],
  listClients: ({
    companyId,
    page,
  }: { companyId?: string; page?: number } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "clients",
    "list",
    ...(page ? [page] : []),
  ],
  getClient: ({
    companyId,
    clientId,
  }: {
    companyId?: string;
    clientId: string;
  }) => [REQUEST_ACTIONS.GET, "company", companyId, "clients", clientId],
  editClient: ({
    companyId,
    clientId,
  }: {
    companyId?: string;
    clientId: string;
  }) => [REQUEST_ACTIONS.PUT, "company", companyId, "clients", clientId],
  deleteClient: ({
    companyId,
    clientId,
  }: {
    companyId?: string;
    clientId: string;
  }) => [REQUEST_ACTIONS.DELETE, "company", companyId, "clients", clientId],
  listClientOptions: ({ companyId }: { companyId?: string } = {}) => [
    REQUEST_ACTIONS.GET,
    "company",
    companyId,
    "clients",
    "options",
  ],

  contacts: {
    listContactOptions: ({
      companyId,
      clientId,
    }: {
      companyId?: string;
      clientId?: string;
    } = {}) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
      "options",
    ],
    listContacts: ({
      companyId,
      clientId,
    }: {
      companyId?: string;
      clientId: string;
    }) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
      "list",
    ],
    getContact: ({
      companyId,
      clientId,
      contactId,
    }: {
      companyId?: string;
      clientId: string;
      contactId: string;
    }) => [
      REQUEST_ACTIONS.GET,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
      contactId,
    ],
    createContact: ({
      companyId,
      clientId,
    }: {
      companyId?: string;
      clientId: string;
    }) => [
      REQUEST_ACTIONS.POST,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
    ],
    editContact: ({
      companyId,
      clientId,
      contactId,
    }: {
      companyId?: string;
      clientId: string;
      contactId: string;
    }) => [
      REQUEST_ACTIONS.PUT,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
      contactId,
    ],
    deleteContact: ({
      companyId,
      clientId,
      contactId,
    }: {
      companyId?: string;
      clientId: string;
      contactId: string;
    }) => [
      REQUEST_ACTIONS.DELETE,
      "company",
      companyId,
      "clients",
      clientId,
      "contacts",
      contactId,
    ],
  },
};
