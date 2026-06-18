import React from "react";
import {
  RefreshControl,
  FlatList as RNFlastList,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatListProps } from "./types";
import { Pagination } from "../Pagination/Pagination";
import { flatListStyles } from "./styles";
import { ConditionalWrapper } from "@/components/atoms";
import { Link } from "expo-router";
import { Spacing } from "@/styles";

const MIN_WIDTH = 400;

export const FlatList = <ItemType extends Record<string, any>>({
  items,
  isLoading,
  isFetching,
  card: Card,
  refetch,
  keyExtractor,
  pagination,
}: FlatListProps<ItemType>) => {
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / MIN_WIDTH) || 1;

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <RNFlastList
        data={items}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 / numColumns }}>
              <ConditionalWrapper
                isWrapped={!!item?.href}
                wrapper={<Link href={item?.href} asChild />}
              >
                <Card item={item} />
              </ConditionalWrapper>
            </View>
          );
        }}
        keyExtractor={keyExtractor}
        onRefresh={() => refetch?.()}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isLoading ?? false}
            onRefresh={() => refetch?.()}
          />
        }
        key={numColumns}
        numColumns={numColumns}
        columnWrapperStyle={
          numColumns > 1 ? flatListStyles.columnWrapperStyle : undefined
        }
        contentContainerStyle={flatListStyles.columnWrapperStyle}
        style={{ paddingHorizontal: Spacing.sm }}
      />

      {pagination ? <Pagination {...pagination} /> : null}
    </View>
  );
};
