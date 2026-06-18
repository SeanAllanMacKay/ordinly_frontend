import { FileInputProps } from "@/components/atoms/FileInput";

export type AddProjectMilestoneFormFieldTypes = {
  name: string;
  description?: string;
  status?: string;
  dueDate?: Date;
  approver?: string;
  documents: FileInputProps["value"];
};
