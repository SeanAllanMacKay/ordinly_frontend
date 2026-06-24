import { FileInputProps } from "@/components/atoms";

export type AddProjectMilestoneFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  dueDate?: Date;
  approver?: string;
  documents: FileInputProps["value"];
};
