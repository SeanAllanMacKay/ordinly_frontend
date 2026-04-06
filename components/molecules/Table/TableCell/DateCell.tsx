import { Typography } from "@/components/atoms";
import React from "react";
import { DateCellProps } from "../types";
import { format, isValid } from "date-fns";

const dateFormat = "MMM dd, yyyy";

export const DateCell = ({ value }: DateCellProps) => {
  const dateValue = value ? new Date(value as Date) : undefined;
  const displayValue = isValid(dateValue)
    ? format(dateValue as Date, dateFormat)
    : "-";

  return <Typography>{displayValue}</Typography>;
};
