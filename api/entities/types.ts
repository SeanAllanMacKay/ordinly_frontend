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
  downloadURL: string;
} & CreatedFieldTypes &
  DeletedFieldTypes;

export type LocationType = {
  id: string;
  address: string;
  city: string;
  region: string;
  country: string;
  // ZIP, Postal Code, etc
  zoneIdentifier: string;
};

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
  name: string;
  description: string;
  permissions: CompanyPermissionType[];
};

export type WorkerType = {
  id: string;
  user: UserType;
  roles: RoleType[];
  permissions: CompanyPermissionType[];
} & AssignedFieldTypes &
  DeletedFieldTypes;

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

export type ClientType = {
  id: string;
  name: string;
  description: string;
  projects: ProjectType[];
  documents: DocumentType[];
  billingAddress: LocationType;
  issueDate: Date;
  payableDate: Date;
  billingPeriod: { start: Date; end: Date };
  purchaseOrders: PurchaseOrder[];
  changeOrders: ChangeOrder[];
  // percentage
  retainage: number;
  // percentages
  taxes: {
    federal: number;
    state: number;
    local: number;
  };
  paymentMethods: PaymentMethodType[];
} & (
  | { user?: UserType }
  | { company?: Pick<CompanyType, "id" | "name" | "logo"> }
) &
  CreatedFieldTypes &
  DeletedFieldTypes;

export type LicenseNumber = {
  id: string;
  number: string;
  description?: string;
};

export type CompanyType = {
  id: string;
  name: string;
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

export type FileMetadataType = {
  maxFileSize: number;
  acceptedFileTypes: string[];
  maxFiles: number;
};
