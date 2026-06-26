import { DateRangeValue } from "@/components/atoms";

export type AddProjectFormFieldTypes = {
  name: string;
  description: string;
  status: string;
  priority: string;
  dateRange?: DateRangeValue;
  clientId?: string;
  contactIds: string[];
  userIds: string[];
  teamIds: string[];
};
