export type RemoteFileType = {
  id: string;
  name: string;
  externalURL: string;
};

export type LocalFileType =
  | File
  | {
      name?: string;
      uri: string;
      type: string;
    };

export type FileType = RemoteFileType | LocalFileType;

export type FileInputProps = {
  value: FileType[];
  onChange: (files: FileType[]) => void;
};
