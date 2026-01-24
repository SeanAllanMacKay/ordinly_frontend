import {
  Table,
  FlatList,
  FlatListProps,
  TableProps,
  EmptyState,
  EmptyStateProps,
  Text,
} from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";

export type DataListProps<
  ItemType,
  QueryType extends UseInfiniteQueryResult
> = {
  entities: EmptyStateProps["variant"];
  query: QueryType;
  dataExtractor: (data: any) => ItemType[];
  getHref?: (item: ItemType) => string;
} & Pick<FlatListProps<ItemType>, "card" | "keyExtractor"> &
  Pick<TableProps<ItemType>, "columns">;

type DataListVariant = "table" | "cards";

const DATA_LIST_STORAGE_KEY = "preferred-display";

const isDataListVariant = (string: string | null): string is DataListVariant =>
  string === "cards" || string === "table";

export const DataList = <ItemType, QueryType extends UseInfiniteQueryResult>({
  query,
  entities,
  getHref,
  ...props
}: DataListProps<ItemType, QueryType>) => {
  const [variant, setVariant] = useState<DataListVariant>();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    refetch,
  } = query;

  const onFetchNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
      setCurrentPage(currentPage + 1);
    }
  }, [hasNextPage, fetchNextPage]);

  const onFetchPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      fetchPreviousPage();
      setCurrentPage(currentPage - 1);
    }
  }, [hasPreviousPage, fetchPreviousPage]);

  const commonProps = useMemo(
    () => ({
      isLoading,
      isFetching,
    }),
    [isLoading, isFetching]
  );

  const tableProps = useMemo(() => {
    const { dataExtractor, columns } = props;

    return {
      columns,
      page: currentPage,
      onPaginationChange: (page) => {
        if (page < currentPage) {
          onFetchPreviousPage();
        } else {
          onFetchNextPage();
        }
      },
      totalPages: data?.pages?.[0].totalPages,
      items: dataExtractor(data?.pages[currentPage]),
      pageSize: 15,
    };
  }, [props, currentPage, data, getHref]);

  const cardProps = useMemo(() => {
    const { dataExtractor, card, keyExtractor } = props;

    return {
      card,
      onFetchNextPage,
      refetch,
      keyExtractor,
      items: data?.pages?.reduce(
        (aggregator: ItemType[], page: unknown) => [
          ...aggregator,
          ...dataExtractor(page),
        ],
        []
      ),
    };
  }, [props, data, refetch, onFetchNextPage]);

  const isEmpty = useMemo(() => {
    const { dataExtractor } = props;

    return !data?.pages?.reduce(
      (aggregator: ItemType[], page: unknown) => [
        ...aggregator,
        ...dataExtractor(page),
      ],
      []
    ).length;
  }, [data, props]);

  const toggleVariant = useCallback(
    async (
      newVariant: DataListVariant = variant === "cards" ? "table" : "cards"
    ) => {
      setVariant(newVariant);

      try {
        await AsyncStorage.setItem(DATA_LIST_STORAGE_KEY, newVariant);
      } catch (e) {
        // saving error
      }
    },
    [variant]
  );

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(DATA_LIST_STORAGE_KEY);

      toggleVariant(isDataListVariant(value) ? value : "cards");
    })();
  }, []);

  return isLoading ? (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading...</Text>
    </View>
  ) : isEmpty ? (
    <EmptyState variant={entities} />
  ) : (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Switch
          value={variant === "table"}
          onValueChange={() => toggleVariant()}
        />
      </View>

      {variant === "cards" && "card" in props ? (
        <FlatList<ItemType> {...commonProps} {...cardProps} />
      ) : "columns" in props ? (
        <Table<ItemType>
          {...commonProps}
          {...tableProps}
          getRowHref={getHref}
        />
      ) : null}
    </>
  );
};
