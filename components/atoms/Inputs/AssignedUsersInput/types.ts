import { FormFieldInputProps } from "../../Form/types";

export type AssignedUserOption = {
  value: string;
  label: string;
  /** Secondary line shown under the name in the picker (e.g. the user's role). */
  description?: string | null;
  imageURL?: string;
};

export type AssignedUsersInputProps = FormFieldInputProps<string[]> & {
  options: AssignedUserOption[];
  /** Text shown in the collapsed field when nothing is selected. */
  placeholder?: string;
  /** Title of the selection modal; defaults to the placeholder. */
  modalTitle?: string;
};
