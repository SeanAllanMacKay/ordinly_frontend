// Display-only shape returned by the dedicated `/options` endpoints (unpaginated
// select/multiselect data). `label` is nullable for some entities (e.g. clients).
export type OptionType = { value: string; label: string | null };

export type PermissionType<AssetTypes extends string> = {
  asset: AssetTypes;
  description: string;
  actions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
};

export type CreatedFieldTypes = {
  createdBy: UserType;
  createdDate: Date;
};

export type DeletedFieldTypes = {
  deletedBy?: UserType;
  deletedDate?: Date;
};

export type AssignedFieldTypes = {
  assignedBy: UserType & { companyId: string };
  assignedDate: Date;
};

export type UserAssigneeType = Pick<UserType, "id" | "name"> &
  AssignedFieldTypes &
  DeletedFieldTypes;

export type CompanyAssigneeType = Pick<CompanyType, "id" | "name" | "logo"> &
  AssignedFieldTypes &
  DeletedFieldTypes;

export type UserType = {
  id: string;
  name: string;
  profilePictureURL?: string;
} & Pick<DeletedFieldTypes, "deletedDate">;

export type AssigneeFieldTypes = {
  assignedUsers: UserType[];
  assignedCompanies: CompanyAssigneeType[];
};

export type StatusType = {
  id: string;
  name: string;
  color: string;
} & Pick<CreatedFieldTypes, "createdDate"> &
  Partial<Pick<CreatedFieldTypes, "createdBy">> &
  DeletedFieldTypes;

export type PriorityType = {
  id: string;
  name: string;
  color: string;
} & Pick<CreatedFieldTypes, "createdDate"> &
  Partial<Pick<CreatedFieldTypes, "createdBy">> &
  DeletedFieldTypes;

export type DocumentType = {
  id: string;
  name: string;
  description?: string;
  size: number;
  type: string;
  externalURL: string;
} & CreatedFieldTypes &
  DeletedFieldTypes;

export type GeocodeContextItemType = {
  mapbox_id: string;
  name: string;
};

export type GeoCodeDataType = {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name_preferred: string;
  place_formatted: string;
  coordinates: {
    longitude: number;
    latitude: number;
    accuracy: string;
    routable_points: Array<{
      name: string;
      latitude: number;
      longitude: number;
    }>;
  };
  context: {
    address?: GeocodeContextItemType & {
      address_number: string;
      street_name: string;
    };
    street?: GeocodeContextItemType;
    neighborhood?: GeocodeContextItemType & { wikidata_id?: string };
    postcode?: GeocodeContextItemType;
    place?: GeocodeContextItemType & { wikidata_id?: string };
    region?: GeocodeContextItemType & {
      wikidata_id?: string;
      region_code: string;
      region_code_full: string;
    };
    country?: GeocodeContextItemType & {
      wikidata_id?: string;
      country_code: string;
      country_code_alpha_3: string;
    };
  };
};

export type LocationType = {
  id: string;
  projectId: string;
  name: string;
  type: "address" | "poi" | "place" | string;
  latitude: string;
  longitude: string;
} & GeoCodeDataType;

export type PhoneNumberType = {
  id: string;
  number: string;
  type: string;
  description?: string;
};

export type EmailType = {
  id: string;
  email: string;
  type: string;
  description?: string;
};

export type WebsiteType = {
  id: string;
  url: string;
  description?: string;
};

export type TimeIntervalType = {
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
};

export type HoursOfOperationType = {
  monday: TimeIntervalType;
  tuesday: TimeIntervalType;
  wednesday: TimeIntervalType;
  thursday: TimeIntervalType;
  friday: TimeIntervalType;
  saturday: TimeIntervalType;
  sunday: TimeIntervalType;
};

export type InfoListItemType = {
  id: string;
  name: string;
  description?: string;
};

export type InfoListType = {
  id: string;
  name: string;
  description?: string;
  items: InfoListItemType[];
  includeInSearch: boolean;
};

export type PaymentMethodType = {
  id: string;
  name: string;
  description?: string;
};

export type InvoiceType = {
  id: string;
  name: string;
};

export type ChecklistItemType = {
  id: string;
  name: string;
  isComplete: boolean;
  order: number;
  documents?: DocumentType[];
} & AssigneeFieldTypes;

export type ProjectTaskKind = "task" | "milestone" | "phase";

// Lightweight shape for the linked worker/team entities returned on projects,
// tasks/phases, and clients (the `users`/`teams` arrays). Only enough to drive
// the multiselect prefill + display; full detail lives on the dedicated reads.
export type LinkedTeamType = {
  id: string;
  name: string;
  description: string | null;
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status?: StatusType;
  priority?: PriorityType;
  startDate?: Date;
  dueDate?: Date;
  checklist: ChecklistItemType[];
  documents?: DocumentType[];
  externalURL: string;
  // The phase this task belongs to (GET task response). Null when unassigned.
  parentPhase?: { id: string; name: string } | null;
  // Directly-assigned workers/teams (distinct from the inherited assignedUsers).
  users?: MemberUserType[];
  teams?: LinkedTeamType[];
} & AssigneeFieldTypes;

export type ProjectPermissionType = PermissionType<
  | "invoices"
  | "project_documents"
  | "all_tasks"
  | "assigned_tasks"
  | "task_documents"
  | "all_checklist_items"
  | "assigned_checklist_items"
  | "checklist_item_documents"
>;

export type ProjectType = {
  id: string;
  name: string;
  description?: string;
  status?: StatusType;
  priority?: PriorityType;
  tasks?: TaskType[];
  documents?: DocumentType[];
  startDate?: Date;
  dueDate?: Date;
  updatedAt?: Date;
  locations?: LocationType[];
  // Linked entities returned on the GET project response.
  clients?: ClientType[];
  contacts?: ContactType[];
  users?: MemberUserType[];
  teams?: LinkedTeamType[];
} & CreatedFieldTypes &
  DeletedFieldTypes & {
    assignedUsers: AssigneeFieldTypes["assignedUsers"] & {
      permissions: ProjectPermissionType;
    };
    assignedCompanies: AssigneeFieldTypes["assignedCompanies"] & {
      permissions: ProjectPermissionType;
    };
  };

export type CompanyProfileType = Pick<
  CompanyType,
  "name" | "logo" | "paymentMethods"
> & {
  id: string;
  description?: string;
  establishedDate: Date;
  phoneNumber?: PhoneNumberType[];
  email: EmailType[];
  locations?: LocationType[];
  hoursOfOperation: HoursOfOperationType;
  websites?: WebsiteType[];
  phoneNumbers?: PhoneNumberType[];
  documents?: DocumentType[];
  albums?: DocumentType[];
  infoLists?: InfoListType[];
};

export type CompanyPermissionType = PermissionType<
  | "company"
  | "profile"
  | "workers"
  | "documents"
  | "folders"
  | "invoices"
  | "license_numbers"
  | "all_clients"
  | "all_projects"
  | "all_tasks"
  | "all_checklist_items"
  | "assigned_projects"
  | "assigned_tasks"
  | "assigned_clients"
  | "assigned_checklist_items"
  | "project_documents"
  | "task_documents"
  | "checklist_item_documents"
>;

export type RoleType = {
  id: string;
  // System roles are global and not owned by a company.
  companyId: string | null;
  name: string;
  description: string;
} & CreatedFieldTypes &
  DeletedFieldTypes;

// A company member's nested user differs from the global UserType: it carries
// email/isVerified instead of a profile picture.
export type MemberUserType = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
};

export type WorkerRoleAssignmentType = {
  id: string;
  roleId: string;
  assignedDate: Date;
  role: RoleType;
};

export type WorkerType = {
  id: string;
  userId: string;
  companyId: string;
  assignedDate: Date;
  user: MemberUserType;
  roles: WorkerRoleAssignmentType[];
};

export type TeamMemberType = {
  id: string;
  teamId: string;
  userId: string;
  assignedDate: Date;
  user: MemberUserType;
};

export type TeamType = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  members: TeamMemberType[];
} & CreatedFieldTypes &
  DeletedFieldTypes;

export type InvitationType = {
  id: string;
  companyId: string;
  email: string;
  roleId: string;
  status: "pending" | "accepted" | "revoked" | "declined";
  token: string;
  invitedDate: Date;
  invitedBy: string;
  respondedDate?: Date;
  role: RoleType;
};

// ⚠ Exact shape of a permission level is unconfirmed with the BE.
export type PermissionLevelType = {
  id: string;
  value: number;
  name?: string;
};

// Item shape returned by GET /roles/:roleId/permissions. levelId/levelValue
// reflect the role's current level (lowest level when assigned is false).
export type RolePermissionType = {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  levels: PermissionLevelType[];
  levelId: string;
  levelValue: number;
  assigned: boolean;
};

// Item shape returned by GET /roles/catalog.
export type PermissionCatalogEntryType = {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  levels: PermissionLevelType[];
};

export type FolderType = {
  id: string;
  name: string;
  description: string;
  documents: DocumentType[];
};

export type ChangeRequest = {};

export type PurchaseRequest = {};

export type ChangeOrder = {};

export type PurchaseOrder = {};

export type ContactType = {
  id: string;
  name: string;
  role?: string;
  description?: string;
  phoneNumbers?: PhoneNumberType[];
  emails?: EmailType[];
  locations?: LocationType[];
} & CreatedFieldTypes &
  DeletedFieldTypes;

export type ClientType = {
  id: string;
  name: string;
  description?: string;
  clientUserId?: string;
  clientCompanyId?: string;
  contacts?: ContactType[];
  phoneNumbers?: PhoneNumberType[];
  emails?: EmailType[];
  locations?: LocationType[];
  // Linked workers/teams returned on the GET client response.
  users?: MemberUserType[];
  teams?: LinkedTeamType[];
} & CreatedFieldTypes &
  DeletedFieldTypes;

export type LicenseNumber = {
  id: string;
  number: string;
  description?: string;
};

export type CompanyType = {
  id: string;
  name: string;
  description: string;
  logo?: {
    createdBy: string;
    createdDate: Date;
    deletedBy?: string;
    deletedDate?: Date;
    description?: string;
    externalId: string;
    externalURL: string;
    id: string;
    name: string;
  };
  owner: UserType;
  licenseNumbers: LicenseNumber[];
  profile: CompanyProfileType;
  workers: WorkerType[];
  folders: FolderType[];
  clients: ClientType[];
  paymentMethods?: PaymentMethodType[];
} & CreatedFieldTypes &
  DeletedFieldTypes;

export const COMPANY_PERMISSION_KEYS = [
  "company_settings",
  "profile",
  "workers",
  "roles",
  "teams",
  "documents",
  "folders",
  "invoices",
  "license_numbers",
  "all_clients",
  "all_projects",
  "all_tasks",
  "all_checklist_items",
  "assigned_projects",
  "assigned_tasks",
  "assigned_clients",
  "assigned_checklist_items",
  "project_documents",
  "task_documents",
  "checklist_item_documents",
] as const;

export const PERMISSION_ACTIONS = [
  "create",
  "read",
  "update",
  "delete",
] as const;

export type CompanyPermissionKey = (typeof COMPANY_PERMISSION_KEYS)[number];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];

// Flat "key:action" -> boolean map matching the GET /company/:companyId
// response. All keys are always present; ungranted entries are `false`.
export type CompanyPermissionFlag = `${CompanyPermissionKey}:${PermissionAction}`;
export type CompanyPermissionFlags = Record<CompanyPermissionFlag, boolean>;

// Single company as returned by GET /company/:companyId (isOwner merged on).
export type CompanyWithOwnershipType = CompanyType & { isOwner: boolean };

export type FileMetadataType = {
  maxFileSize: number;
  acceptedFileTypes: string[];
  maxFiles: number;
};

export type CountryType = {
  id: string;
  name: string;
  code: string;
};
