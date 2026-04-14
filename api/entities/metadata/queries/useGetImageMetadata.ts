import { useQuery } from "@tanstack/react-query";
import { metadataRequests, metadataRequestKeys } from "../requests";

export const useGetImageMetadataQuery = () => {
  return useQuery({
    queryKey: metadataRequestKeys.getImageMetadata(),
    queryFn: metadataRequests.getImageMetadata,
  });
};
