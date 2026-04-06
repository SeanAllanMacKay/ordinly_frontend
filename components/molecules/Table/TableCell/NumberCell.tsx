import { Typography } from "@/components/atoms";
import React from "react";
import { NumberCellProps } from "../types";

export const NumberCell = ({ value }: NumberCellProps) => {
  return <Typography>{value ? `${value?.toString()}` : "-"}</Typography>;
};
