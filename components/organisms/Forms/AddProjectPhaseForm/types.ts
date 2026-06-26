export type AddProjectPhaseFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  dueDate?: Date;
  checklist?: { value: string }[];
  taskIds?: string[];
  userIds?: string[];
  teamIds?: string[];
};
