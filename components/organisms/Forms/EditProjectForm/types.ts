export type EditProjectFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  dueDate?: Date;
  clientId?: string;
  contactIds?: string[];
  userIds?: string[];
  teamIds?: string[];
};
