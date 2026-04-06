import React from "react";

import { DataTable } from "react-native-paper";
import { TableHeaderProps } from "./types";
import { Typography } from "@/components/atoms";

export const TableHeader = <ListItem,>({
  columns,
}: TableHeaderProps<ListItem>) => {
  return (
    <DataTable.Header>
      {columns.map(({ label, variant }) => (
        <DataTable.Title
          numeric={variant === "number"}
          key={`table-column-${label}`}
        >
          <Typography>{label}</Typography>
        </DataTable.Title>
      ))}
    </DataTable.Header>
  );
};
