import { Typography } from "@/components/atoms";
import React from "react";
import { EmailCellProps } from "../types";

export const EmailCell = ({ value }: EmailCellProps) => {
  return <Typography>{value ?? "-"}</Typography>;
};
