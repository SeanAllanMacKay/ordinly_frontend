import React from "react";
import { DataTable } from "react-native-paper";
import { TableCellProps } from "../types";
import { TextCell } from "./TextCell";
import { NumberCell } from "./NumberCell";
import { PhoneNumberCell } from "./PhoneNumberCell";
import { DateCell } from "./DateCell";
import { TagCell } from "./TagCell";

export const TableCell = <ItemType,>({
  variant,
  value,
}: TableCellProps<ItemType>) => {
  return (
    <DataTable.Cell numeric={variant === "number"}>
      {variant === "string" ? <TextCell value={value} /> : null}
      {variant === "number" ? <NumberCell value={value} /> : null}
      {variant === "phone" ? <PhoneNumberCell value={value} /> : null}
      {variant === "date" ? <DateCell value={value} /> : null}
      {variant === "tag" ? <TagCell value={value} /> : null}
    </DataTable.Cell>
  );
};
