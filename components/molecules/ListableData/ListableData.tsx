import React, { useEffect, useState } from "react";
import { ListableDataDisplayType, ListableDataProps } from "./types";
import { useIsPhone } from "@/styles/hooks/useIsPhone";
import {
  getFlatListProps,
  getTableProps,
  isListableDataDisplayType,
} from "./utils";
import { View } from "react-native";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { Toggle } from "@/components/atoms";
import { listableDataStyles } from "./styles";
import { FlatList, FlatListProps } from "../FlatList";
import { Table, TableProps } from "../Table";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ROOT_DATA_LIST_STORAGE_KEY = "data-list-display";

export const ListableData = <ItemType extends Record<string, any>>(
  props: ListableDataProps<ItemType>,
) => {
  const isPhone = useIsPhone();
  const [variant, setVariant] = useState<ListableDataDisplayType | undefined>();

  const toggleVariant = () => {
    const newVariant = variant === "table" ? "cards" : "table";
    setVariant(newVariant);

    AsyncStorage.setItem(`${ROOT_DATA_LIST_STORAGE_KEY}-${entity}`, newVariant);
  };

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

  // Set variant to specified preference for table
  useEffect(() => {
    (async () => {
      if (!isPhone) {
        const value = await AsyncStorage.getItem(
          `${ROOT_DATA_LIST_STORAGE_KEY}-${entity}`,
        );

        setVariant(isListableDataDisplayType(value) ? value : "cards");
      } else {
        setVariant("cards");
      }
    })();
  }, [isPhone]);

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
          {!isPhone ? (
            <View style={listableDataStyles.toggleContainer}>
              <Toggle
                value={variant === "table"}
                onChange={() => toggleVariant()}
              />
            </View>
          ) : null}

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
