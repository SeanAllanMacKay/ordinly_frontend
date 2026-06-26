export type AddProjectTaskFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  dueDate?: Date;
  checklist?: { value: string }[];
  phaseId?: string;
  userIds?: string[];
  teamIds?: string[];
};
