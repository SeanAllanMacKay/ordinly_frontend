import { useQuery } from "@tanstack/react-query";
import { metadataRequests, metadataRequestKeys } from "../requests";

export const useGetFileMetadataQuery = () => {
  return useQuery({
    queryKey: metadataRequestKeys.getFileMetadata(),
    queryFn: metadataRequests.getFileMetadata,
  });
};
