import React from "react";
import { RefreshControl, FlatList as RNFlastList, View } from "react-native";
import { FlatListProps } from "./types";
import { Pagination } from "../Pagination/Pagination";
import { flatListStyles } from "./styles";
import { ConditionalWrapper } from "@/components/atoms";
import { Link } from "expo-router";

export const FlatList = <ItemType extends Record<string, any>>({
  items,
  isLoading,
  isFetching,
  item: Item,
  refetch,
  keyExtractor,
  pagination,
}: FlatListProps<ItemType>) => {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <RNFlastList
        data={items}
        renderItem={({ item }) => {
          return (
            <View>
              <ConditionalWrapper
                isWrapped={!!item?.href}
                wrapper={<Link href={item?.href} asChild />}
              >
                <Item item={item} />
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
        contentContainerStyle={flatListStyles.columnWrapperStyle}
      />

      {pagination ? <Pagination {...pagination} /> : null}
    </View>
  );
};
