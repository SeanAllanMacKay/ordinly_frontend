import { ListableDataType } from "../ListableData";

export type FlatListProps<ItemType> = ListableDataType<ItemType> & {
  item: ({ item }: { item: ItemType }) => React.JSX.Element;
  keyExtractor: (item: ItemType) => string;
};
