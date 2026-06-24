import React from "react";
import { ListableDataProps } from "./types";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import { getFlatListProps, getTableProps } from "./utils";
import { View } from "react-native";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { listableDataStyles } from "./styles";
import { FlatList, FlatListProps } from "../FlatList";
import { Table, TableProps } from "../Table";
import { useWidth } from "@/styles";

export const ListableData = <ItemType extends Record<string, any>>(
  props: ListableDataProps<ItemType>,
) => {
  const isWide = useWidth(700);
  const variant = isWide ? "table" : "cards";

  const {
    isLoading,
    isFetching,
    pagination,
    items,
    entity,
    onPressItem,
    emptyState,
  } = props;

  const commonProps = {
    isLoading,
    isFetching,
    pagination,
    items,
    onPressItem,
  };

  const tableProps = getTableProps(props);
  const flatListProps = getFlatListProps(props);

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : !items.length ? (
        emptyState ? (
          <View style={listableDataStyles.emptyStateContainer}>
            {emptyState}
          </View>
        ) : (
          <EmptyState entity={entity} />
        )
      ) : (
        <>
          {variant === "cards" ? (
            <FlatList<ItemType>
              {...commonProps}
              {...(flatListProps as FlatListProps<ItemType>)}
            />
          ) : null}
          {variant === "table" ? (
            <Table<ItemType>
              {...commonProps}
              {...(tableProps as TableProps<ItemType>)}
            />
          ) : null}
        </>
      )}
    </>
  );
};
