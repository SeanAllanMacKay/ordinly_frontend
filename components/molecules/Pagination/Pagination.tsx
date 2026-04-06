import React from "react";
import { PaginationProps } from "./types";
import { DataTable } from "react-native-paper";
import { paginationStyles } from "./styles";

export const Pagination = ({
  page,
  totalPages,
  onPaginationChange,
}: PaginationProps) => {
  return (
    <DataTable.Pagination
      // DataTable.Pagination starts at 0
      page={page - 1}
      numberOfPages={totalPages}
      // DataTable.Pagination starts at 0
      onPageChange={(newPage) => onPaginationChange(newPage + 1)}
      label={`Page ${page} of ${totalPages}`}
      style={paginationStyles.container}
    />
  );
};
