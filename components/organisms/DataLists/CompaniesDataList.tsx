import React from "react";
import { CompanyCard } from "@/components";
import { CompanyType, useGetCompaniesQuery } from "@/api";
import { usePagination } from "@/components/molecules/Pagination/utils";
import { ListableData } from "@/components/molecules/ListableData";

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
      pagination={{
        page,
        totalPages: companiesQuery.data?.totalPages ?? 0,
        onPaginationChange,
      }}
      // cards
      keyExtractor={(item: CompanyType) => String(item.id)}
      card={CompanyCard}
      // table
      columns={[{ label: "Name", key: "name" }]}
    />
  );
};
