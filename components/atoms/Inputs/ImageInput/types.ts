import { FormFieldInputProps } from "../../Form/types";

export type ImageType =
  | File
  | { uri: string; type: string; name?: string | null }
  | undefined;

export type ImageInputProps = FormFieldInputProps<ImageType>;
