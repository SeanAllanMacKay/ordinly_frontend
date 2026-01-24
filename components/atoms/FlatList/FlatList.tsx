import { Spacing } from "@/constants/Spacing";
import React from "react";
import {
  RefreshControl,
  FlatList as RNFlastList,
  useWindowDimensions,
  View,
} from "react-native";

export type FlatListProps<ItemType> = {
  isLoading?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  items: ItemType[];
  card: ({ item }: { item: ItemType }) => React.JSX.Element;
  onFetchNextPage: () => void;
  refetch: () => void;
  keyExtractor: (item: ItemType) => string;
};

export const FlatList = <ItemType,>({
  items,
  isLoading,
  isFetching,
  card: Card,
  onFetchNextPage,
  refetch,
  keyExtractor,
}: FlatListProps<ItemType>) => {
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / 300) || 1;

  return (
    <RNFlastList
      data={items}
      renderItem={({ item, index }) => (
        <View style={{ flex: 1 / numColumns }}>
          <Card item={item} index={index} />
        </View>
      )}
      keyExtractor={keyExtractor}
      onEndReached={onFetchNextPage}
      onEndReachedThreshold={150}
      onRefresh={() => refetch()}
      refreshing={isFetching}
      refreshControl={
        <RefreshControl
          refreshing={isLoading ?? false}
          onRefresh={() => refetch()}
        />
      }
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: Spacing.m } : undefined}
      contentContainerStyle={{ gap: Spacing.m }}
    />
  );
};
