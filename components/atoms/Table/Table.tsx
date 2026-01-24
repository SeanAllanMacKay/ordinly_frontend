import React from "react";
import {
  DataTable,
  type DataTableHeaderProps,
  type DataTableCellProps,
  type DataTablePaginationProps,
} from "react-native-paper";
import { Tag, Text } from "@/components";
import { Link } from "expo-router";

export type TableProps<ItemType> = {
  isLoading?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  items: ItemType[];
  columns: {
    key: keyof ItemType;
    label: string;
    variant?: "string" | "number" | "tag";
  }[];
  page: number;
  pageSize: number;
  totalPages: number;
  onPaginationChange: () => void;
  getRowHref?: (item: ItemType) => string;
};

export const Table = <ItemType,>({
  items,
  columns,
  isLoading,
  isFetching,
  page,
  pageSize,
  totalPages,
  onPaginationChange,
  getRowHref,
}: TableProps<ItemType>) => {
  return (
    <DataTable>
      <DataTable.Header>
        {columns.map(({ label, variant }) => (
          <DataTable.Title numeric={variant === "number"}>
            <Text>{label}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {items.map((item) => (
        <Link href={getRowHref?.(item)} asChild>
          <DataTable.Row>
            {columns.map(({ key, variant = "string" }) => (
              <DataTable.Cell numeric={variant === "number"}>
                {["string", "number"].includes(variant) ? (
                  <Text>{String(item[key])}</Text>
                ) : variant === "tag" ? (
                  <Tag variant={item[key]} />
                ) : null}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        </Link>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfItemsPerPage={pageSize}
        numberOfPages={totalPages}
        onPageChange={onPaginationChange}
        label={`Page ${page + 1} of ${totalPages}`}
      />
    </DataTable>
  );
};
