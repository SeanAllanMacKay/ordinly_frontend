import { GET, REQUEST_ACTIONS } from "@/api/requests";

import { FileMetadataType } from "../types";

export const metadataRequests = {
  getImageMetadata: async () =>
    await GET<{
      message: string;
      metadata: FileMetadataType;
    }>({
      endpoint: `/metadata/image`,
    }),
  getFileMetadata: async () =>
    await GET<{
      message: string;
      metadata: FileMetadataType;
    }>({
      endpoint: `/metadata/file`,
    }),
};

export const metadataRequestKeys = {
  getImageMetadata: () => [REQUEST_ACTIONS.GET, "metadata", "image"],
  getFileMetadata: () => [REQUEST_ACTIONS.GET, "metadata", "file"],
};
