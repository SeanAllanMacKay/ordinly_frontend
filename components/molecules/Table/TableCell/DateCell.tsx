import { Typography } from "@/components/atoms";
import React from "react";
import { DateCellProps } from "../types";
import { useDateFormat } from "@/i18n/useDateFormat";

const dateFormat = "MMM dd, yyyy";

export const DateCell = ({ value }: DateCellProps) => {
  const formatDate = useDateFormat();
  const displayValue = formatDate(value, dateFormat);

  return <Typography>{displayValue}</Typography>;
};
