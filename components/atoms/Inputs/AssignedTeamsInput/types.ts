import { FormFieldInputProps } from "../../Form/types";

export type AssignedTeamMember = {
  name: string;
  imageURL?: string;
};

export type AssignedTeamOption = {
  value: string;
  label: string;
  imageURL?: string;
  members: AssignedTeamMember[];
};

export type AssignedTeamsInputProps = FormFieldInputProps<string[]> & {
  options: AssignedTeamOption[];
  /** Text shown in the collapsed field when nothing is selected. */
  placeholder?: string;
  /** Title of the selection modal; defaults to the placeholder. */
  modalTitle?: string;
};
