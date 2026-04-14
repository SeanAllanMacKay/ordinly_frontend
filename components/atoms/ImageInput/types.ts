export type ImageType = {
  fileName?: string;
  uri: string;
  mimeType?: string;
  fileSize?: number;
  fileType: "image";
  file?: File;
};

export type ImageInputProps = {
  isDisabled?: boolean;
  value?: ImageType;
  onChange: (value: ImageType) => void;
};
