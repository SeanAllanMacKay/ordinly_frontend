import { ConditionalWrapper } from "@/components/atoms";
import { Link } from "expo-router";
import React from "react";
import { DataTable } from "react-native-paper";
import { TableRowProps } from "./types";
import { TableCell } from "./TableCell";

export const TableRow = <ListItem extends Record<string, any>>({
  item,
  columns,
  onPress,
}: TableRowProps<ListItem> & { onPress?: () => void }) => {
  return (
    <ConditionalWrapper
      isWrapped={item?.href}
      wrapper={<Link href={item?.href} asChild />}
      key={`table-row-${item.id}`}
    >
      <DataTable.Row onPress={item?.href ? undefined : onPress}>
        {columns.map(({ key, variant = "string" }, index) => (
          <TableCell
            key={`table-cell-${key}-row-${index}`}
            value={item[key]}
            variant={variant}
          />
        ))}
      </DataTable.Row>
    </ConditionalWrapper>
  );
};
