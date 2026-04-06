import { ListableDataDisplayType, ListableDataProps } from "./types";

export const isListableDataDisplayType = (
  string: string | null,
): string is ListableDataDisplayType =>
  string === "cards" || string === "table";

export const getTableProps = <ListItem>(props: ListableDataProps<ListItem>) => {
  if (!props.overrideDisplayType || props.overrideDisplayType === "table") {
    const { columns } = props;

    return { columns };
  }

  return undefined;
};

export const getFlatListProps = <ListItem>(
  props: ListableDataProps<ListItem>,
) => {
  if (!props.overrideDisplayType || props.overrideDisplayType === "cards") {
    const { card, keyExtractor } = props;

    return { card, keyExtractor };
  }

  return undefined;
};
