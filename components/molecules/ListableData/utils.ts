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
    const { item, keyExtractor } = props;

    return { item, keyExtractor };
  }

  return undefined;
};

export const getListProps = <ListItem>(props: ListableDataProps<ListItem>) => {
  if (!props.overrideDisplayType || props.overrideDisplayType === "list") {
    const { listItem, keyExtractor } = props;

    return { listItem, keyExtractor };
  }

  return undefined;
};
