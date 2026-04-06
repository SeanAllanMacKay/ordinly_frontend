import { Tag, Typography } from "@/components/atoms";
import React from "react";
import { TagCellProps } from "../types";

export const TagCell = ({ value }: TagCellProps) => {
  return value ? (
    <Tag variant={value.name} text={value.name} color={value.color} />
  ) : (
    <Typography>-</Typography>
  );
};
