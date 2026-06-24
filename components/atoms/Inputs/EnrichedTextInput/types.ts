import { FormFieldInputProps } from "../../Form/types";

export type EnrichedTextInputProps = FormFieldInputProps<string | undefined> & {
  isSkeleton?: boolean;
};
