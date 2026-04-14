export type EditProjectTaskFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  dueDate?: Date;
  checklist?: { value: string }[];
};
