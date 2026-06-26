import React from "react";
import { useTranslation } from "react-i18next";
import { PaginationProps } from "./types";
import { DataTable } from "react-native-paper";
import { paginationStyles } from "./styles";

export const Pagination = ({
  page,
  totalPages,
  onPaginationChange,
}: PaginationProps) => {
  const { t } = useTranslation();

  return (
    <DataTable.Pagination
      // DataTable.Pagination starts at 0
      page={page - 1}
      numberOfPages={totalPages}
      // DataTable.Pagination starts at 0
      onPageChange={(newPage) => onPaginationChange(newPage + 1)}
      label={t("pagination", { page, totalPages })}
      style={paginationStyles.container}
    />
  );
};
