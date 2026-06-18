export type ImageType =
  | File
  | { uri: string; type: string; name?: string | null }
  | undefined;

export type ImageInputProps = {
  isDisabled?: boolean;
  value?: ImageType;
  onChange: (value: ImageType) => void;
};
