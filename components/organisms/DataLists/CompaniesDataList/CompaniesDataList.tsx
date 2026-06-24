import React from "react";
import { CompanyListItem } from "@/components";
import { CompanyType, useGetCompaniesQuery } from "@/api";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";
import { CompaniesEmptyState } from "./CompaniesEmptyState";

export const CompaniesDataList = () => {
  const { page, onPaginationChange } = usePagination();

  const companiesQuery = useGetCompaniesQuery({ page });

  return (
    <ListableData
      // common
      entity="companies"
      items={companiesQuery.data?.companies ?? []}
      isLoading={companiesQuery.isLoading}
      isFetching={companiesQuery.isFetching}
      emptyState={<CompaniesEmptyState />}
      pagination={{
        page,
        totalPages: companiesQuery.data?.totalPages ?? 1,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: CompanyType) => String(item.id)}
      item={CompanyListItem}
      // table
      columns={[{ label: "Name", key: "name" }]}
    />
  );
};
