import { ListableDataType } from "../ListableData";

export type TableCellVariantType =
  | "string"
  | "number"
  | "tag"
  | "email"
  | "phone"
  | "date";

export type TableProps<ItemType> = ListableDataType<ItemType> & {
  columns: {
    key: keyof ItemType;
    label: string;
    variant?: TableCellVariantType;
  }[];
};

export type TableHeaderProps<ItemType> = Pick<TableProps<ItemType>, "columns">;
export type TableRowProps<ItemType> = Pick<TableProps<ItemType>, "columns"> &
  TableProps<ItemType>["items"][number];

export type TableCellProps<ItemType> = {
  value: ItemType[keyof ItemType];
  variant?: TableCellVariantType;
};
export type TextCellProps = {
  value?: string;
};
export type NumberCellProps = {
  value?: string | number;
};
export type DateCellProps = {
  value?: string | Date;
};
export type PhoneNumberCellProps = {
  value?: string | number;
};
export type EmailCellProps = {
  value?: string;
};
export type TagCellProps = {
  value?: {
    name: string;
    color: string;
  };
};
