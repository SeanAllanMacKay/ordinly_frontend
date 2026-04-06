import { Typography } from "@/components/atoms";
import React from "react";
import { TextCellProps } from "../types";

export const TextCell = ({ value }: TextCellProps) => {
  return <Typography>{value ?? "-"}</Typography>;
};
