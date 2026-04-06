import { Href } from "expo-router";
import { PaginationProps } from "../Pagination/types";

export type ListableData<ItemType> = {
  isLoading?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  items: ItemType[];
  onPressItem?: (item: ItemType) => Href;
  pagination: PaginationProps;
  refetch?: () => void;
};
