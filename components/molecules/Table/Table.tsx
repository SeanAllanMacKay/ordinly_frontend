import React from "react";
import { DataTable } from "react-native-paper";
import { TableProps } from "./types";
import { Pagination } from "../Pagination/Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export const Table = <ItemType extends Record<string, any>>({
  items,
  isLoading,
  isFetching,
  columns,
  pagination,
  onPressItem,
}: TableProps<ItemType>) => {
  return (
    <DataTable>
      <TableHeader columns={columns} />

      {items.map((row) => (
        <TableRow
          key={`table-row-${row.id}`}
          item={row}
          columns={columns}
          onPress={onPressItem ? () => onPressItem(row) : undefined}
        />
      ))}

      {pagination ? <Pagination {...pagination} /> : null}
    </DataTable>
  );
};
