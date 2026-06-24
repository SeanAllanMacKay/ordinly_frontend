import { ReactNode } from "react";
import { PaginationProps } from "../Pagination/types";
import { TableProps } from "../Table";
import { FlatListProps } from "../FlatList";

export type ListableDataDisplayType = "cards" | "table";

export type ListableDataType<ItemType> = {
  isLoading?: boolean;
  isFetching?: boolean;
  items: ItemType[];
  onPressItem?: (item: ItemType) => void;
  pagination?: PaginationProps;
  refetch?: () => void;
};

export type EmptyStateProps = {
  entity:
    | "projects"
    | "tasks"
    | "companies"
    | "roles"
    | "teams"
    | "workers"
    | "clients"
    | "contacts";
};

export type ListableDataProps<ItemType> = EmptyStateProps & {
  emptyState?: ReactNode;
} & (
    | ({ overrideDisplayType?: undefined } & TableProps<ItemType> &
        FlatListProps<ItemType>)
    | ({ overrideDisplayType: "table" } & TableProps<ItemType> & {
          [K in keyof FlatListProps<ItemType>]?: never;
        })
    | ({ overrideDisplayType: "cards" } & FlatListProps<ItemType> & {
          [K in keyof TableProps<ItemType>]?: never;
        })
  );
