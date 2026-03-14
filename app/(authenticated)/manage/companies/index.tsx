import React, { useCallback, useEffect } from "react";
import { useNavigation } from "expo-router";
import { Text, useWindowDimensions, View } from "react-native";
import { Button, EmptyState, FlatList, Screen } from "@/components";
import { routes } from "@/constants/routes";
import { useGetCompaniesQuery } from "@/api-abstraction/queries/useGetCompaniesQuery";
import { CompanyType } from "@/api-abstraction/models";
import { ProjectCard } from "@/components/molecules/Cards/ProjectCard";
import { CompanyCard } from "@/components/molecules/Cards/CompanyCard";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";

export default function Companies() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    refetch,
  } = useGetCompaniesQuery();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Companies",
    });
  }, [navigation]);

  const numColumns = Math.floor(width / 300) || 1;

  const onFetchNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return (
    <Screen isLoading={isLoading}>
      {data?.pages?.[0].totalItems ? (
        <FlatList<CompanyType>
          items={data?.pages.reduce(
            (aggregator, { companies }) => [...aggregator, ...companies],
            [] as CompanyType[],
          )}
          card={({ item }) => (
            <CompanyCard
              item={item}
              href={routes.manage.company.root(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          onFetchNextPage={onFetchNextPage}
          refetch={refetch}
          isFetching={isFetching}
          key={numColumns}
        />
      ) : (
        <EmptyState variant="companies" />
      )}

      <FloatingActionButton
        icon="plus"
        label="Add company"
        href={routes.manage.companies.addCompany()}
      />
    </Screen>
  );
}
